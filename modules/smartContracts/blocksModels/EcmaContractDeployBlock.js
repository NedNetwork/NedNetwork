/**
 NedNetwork | NedNetwork blockchain - https://NED_SITE
 @author: Andrey Nedobylsky (admin@twister-vl.ru)
 */


const Signable = require('../../blocksModels/signable');
let type = 'EcmaContractDeploy';
const storj = require('../../instanceStorage');
const cryptography = storj.get('cryptography');

const stableStringify = require('json-stable-stringify');

/**
 * EcmaContract block
 */
class EcmaContractDeployBlock extends Signable {

    /**
     * Get block type
     * @return {string}
     */
    static get blockType() {
        return type;
    }

    /**
     * Create EcmaContract block
     * @param {string} ecmaCode
     * @param {Object} state
     */
    constructor(ecmaCode, state) {
        super();
        this.type = type;
        this.ecmaCode = ecmaCode;
        this.state = state;
        this.state.codeHash = cryptography.hash(this.ecmaCode).toString();
        this.generateData();
    }

    /**
     * Data hash for sign
     */
    generateData() {
        this.data = cryptography.hash(this.type + this.ecmaCode + stableStringify(this.state)).toString();
    }


}

module.exports = EcmaContractDeployBlock;