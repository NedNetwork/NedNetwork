/**
 NedNetwork | NedNetwork blockchain - https://NED_SITE
 @author: Andrey Nedobylsky (admin@twister-vl.ru)
 */

const stableStringify = require('json-stable-stringify');

/**
 * It's a Block
 * Just block It!
 */
class Block {
    constructor(index, previousHash, timestamp, data, hash, startTimestamp, sign) {
        this.index = index;
        this.previousHash = String(previousHash).toString();
        this.timestamp = timestamp;
        this.startTimestamp = startTimestamp;
        if(typeof data === 'object') {
            data = stableStringify(data);
        }
        this.data = data;
        this.hash = String(hash).toString();
        this.sign = sign;
    }
}

module.exports = Block;