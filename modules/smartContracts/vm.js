/**
 iZ³ | Izzzio blockchain - https://izzz.io
 @author: Andrey Nedobylsky (admin@twister-vl.ru)
 */

let ivm = require('isolated-vm');


class VM {

    constructor(options) {
        this.ramLimit = (typeof options === 'undefined' || typeof options.ramLimit === 'undefined' ? 32 : options.ramLimit);
        this.ivm = ivm;
        this.isolate = new ivm.Isolate({memoryLimit: this.ramLimi});
        this.script = '';
        this.state = undefined;
        this.context = undefined;
        this.timeout = 1000;
    }

    /**
     * Encode object references to virtual machine format
     * @param obj
     * @return {ivm.Reference}
     */
    objToReference(obj) {
        let newObj = {};
        for (let a in obj) {
            if(obj.hasOwnProperty(a)) {
                if(typeof obj[a] === 'function') {
                    newObj[a] = {
                        ref: new ivm.Reference(function (...args) {
                            return obj[a](...args)
                        }), ref_type: 'function'
                    };
                } else {
                    if(typeof obj[a] === 'object') {
                        newObj[a] = {ref: objToReference(obj[a]), ref_type: 'object'};
                    } else {
                        newObj[a] = obj[a];
                    }
                }
            }
        }

        return new ivm.Reference(newObj);
    }

    /**
     * Creates context for iZ3 Smart Contracts
     * @param randomSeed
     * @return {*}
     */
    setUpiZ3Context(randomSeed) {
        let context = this.isolate.createContextSync();
        let jail = context.global;
        jail.setSync('_ivm', ivm);
        jail.setSync('global', jail.derefInto());
        jail.setSync('console', this.objToReference(console));
        jail.setSync('_randomSeed', randomSeed);

        let bootstrap = this.isolate.compileScriptSync('new ' + function () {

            /**
             * Decode vm encoded format references
             * @param obj
             */
            function decodeReferences(obj) {
                if(obj.constructor.name === 'Reference') {
                    obj = obj.copySync();
                }
                let newObj = {};
                for (let a in obj) {
                    if(obj.hasOwnProperty(a)) {
                        if(obj[a]['ref_type'] === 'function') {
                            newObj[a] = function (...args) {
                                return obj[a]['ref'].applySync(undefined, args.map(arg => new ivm.ExternalCopy(arg).copyInto()));
                            }
                        } else {
                            if(obj[a]['ref_type'] === 'object') {
                                newObj[a] = obj[a]['ref'].copySync();
                            } else {
                                newObj[a] = obj[a];
                            }
                        }
                    }
                }
                return newObj;
            }

            //Initialize
            let ivm = _ivm;
            _ivm = undefined;
            let randomSeed = _randomSeed;
            _randomSeed = undefined;

            /**
             * IO functions
             */
            global.console = decodeReferences(console);

            /**
             * State safe random method
             * @return {number}
             */
            Math.random = function () {
                let x = Math.sin(randomSeed++) * 12000;
                return x - Math.floor(x);
            };

            /**
             * Contract register method
             * @param contract
             */
            global.registerContract = function registerContract(contract) {
                global.contract = new contract();
            };

            /**
             * Decode and register external object
             * @param objName
             */
            global._registerGlobalObjFromExternal = function _registerGlobalObjFromExternal(objName) {
                global[objName] = decodeReferences(global[objName]);
                return true;
            };

        });
        bootstrap.runSync(context);

        return context;
    }

    /**
     * Compile and run script init with state
     * @param script
     * @param state
     * @param options
     * @return {*}
     */
    compileScript(script, state, options) {

        let contractInit = '';
        /*if(typeof  state.contractClass !== 'undefined') {
            state.contractClass = state.contractClass.trim();
            contractInit = "\n" + `global.contract = new ${state.contractClass}();`
        }*/

        this.script = script;
        this.state = state;
        this.context = this.setUpiZ3Context(state.randomSeed);
        this.compiledScript = this.isolate.compileScriptSync(script + contractInit);

        return this.compiledScript;
    }

    /**
     * Execute compiled script
     * @return {*}
     */
    execute() {
        return this.compiledScript.runSync(this.context, {timeout: this.timeout})
    }

    /**
     * Run method from context in internal method context
     * @param {string} context
     * @param args
     * @return {*}
     */
    runContextMethod(context, ...args) {
        let vmContext = this.context.global;
        let prevContext = vmContext;
        context = context.split('.');
        for (let a in context) {
            if(context.hasOwnProperty(a)) {
                prevContext = vmContext;
                vmContext = vmContext.getSync(context[a]);
            }
        }

        return vmContext.applySync(prevContext.derefInto(), args.map(arg => new ivm.ExternalCopy(arg).copyInto()), {timeout: this.timeout});
    }

    /**
     * Setup execution time limit
     * @param limit
     */
    setTimingLimits(limit) {
        this.timeout = limit;
    }

    /**
     * Get property value from context
     * @param context
     * @return {*}
     */
    getContextProperty(context) {
        let vmContext = this.context.global;
        let prevContext = vmContext;
        context = context.split('.');
        for (let a in context) {
            if(context.hasOwnProperty(a)) {
                prevContext = vmContext;
                vmContext = vmContext.getSync(context[a]);
            }
        }

        return vmContext.copySync()
    }

    /**
     * Defines object in global context
     * @param name
     * @param object
     * @return {*}
     */
    setObjectGlobal(name, object) {
        this.context.global.setSync(name, this.objToReference(object));
        return this.runContextMethod("_registerGlobalObjFromExternal", name);
    }
}

/*
let vm = new VM();
vm.compileScript('new ' + function () {

    class Contract {
        constructor() {
            console.log("CONSTRUCT");
            this.a = 100;
        }

        test(a, b) {
            this.a = a;
            return a + b + this.a;
        }

        fall(){
            while(true){}
        }
    }

    global.registerContract(Contract);

}, {randomSeed: 1});
let result = vm.execute();
//console.log(result);

vm.setObjectGlobal('test', {a: 123});

console.log(vm.runContextMethod("contract.test", 2, 2));
console.log(vm.getContextProperty("contract.a"));
console.log(vm.runContextMethod("contract.fall"));*/
//console.log(vm.runMethod("contract.test", 3, 4));

/*
let result = isolate.compileScriptSync('sum2(1,2)').runSync(context);


console.log(context.global.getSync("testFunc").applySync(undefined, [3, 4]));
console.log(context.global.getSync("testFunc").applySync(undefined, [3, 4]));

console.log(result);*/


module.exports = VM;