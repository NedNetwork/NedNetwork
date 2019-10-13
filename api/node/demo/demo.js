const NodeRPC = require('../NodeRPC');
const EcmaSmartRPC = require('../EcmaSmartRPC');

let izNode = new EcmaSmartRPC('http://localhost:3015/');

let countractSource = `class TestContract extends Contract {
    init(){
        this.vars = new KeyValue('TestContract');
        super.init();
    }
    get contract(){
        return {"name":"TestContract"}
    }
    deploy() {
        console.log('DEPLOY');
        this.vars.put('t', 10);
    }
    call() {
        let t = Number(this.vars.get('t'));
        t++;
        console.log('CALLINGS', t);
        this.vars.put('t', t);
    }
    plus(a,b){
        console.log('PLUS',a,b);
        return Number(a)+Number(b);
    }
}
global.registerContract(TestContract);`;

async function main() {
    let newContract = (await izNode.ecmaDeployContract(countractSource)).result;
    let newAddress = newContract['address'];
    console.log("Deployed contract address: " + newAddress);
    let contractInfo = (await izNode.ecmaGetContractProperty(newAddress, 'contract')).result;
    console.log("Deployed contract info: " + contractInfo);
    console.log("Deploy contract method 'call'");
    let withDeploy = (await izNode.ecmaDeployMethod(newAddress, 'call', [])).result;
    console.log("New deploy block: "+ withDeploy['index']);
    console.log("Call contract method without deploy plus(2,3):");
    let withoutDeploy = (await izNode.ecmaCallMethod(newAddress, 'plus', [2, 3])).result;
    console.log("Result: " + withoutDeploy);
}

main()
.then(()=>console.log('Done'))
.catch(e=>{
    console.log('something went wrong');
    console.log(e);
});