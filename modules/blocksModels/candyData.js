/**
 NedNetwork | NedNetwork blockchain - https://izzz.io
 Candy - https://github.com/NedNetwork/Candy
 @author: Andrey Nedobylsky (admin@twister-vl.ru)
 */


const Signable = require('./signable');
const storj = require('../instanceStorage');
const cryptography = storj.get('cryptography');
let type = 'CandyData';

/**
 * Candy data block
 * Candy - part of NedNetwork blockchain. https://github.com/NedNetwork/Candy
 * @type {Signable}
 */
class CandyData extends Signable {
    /**
     *
     * @param {String} data
     */
    constructor(data) {
        super();
        this.type = type;
        this.candyData = data;
        this.generateData();
    }

    /**
     * Создаёт строку данных для подписи
     */
    generateData() {
        this.data = this.type + cryptography.hash(this.candyData);
    }


}

module.exports = CandyData;