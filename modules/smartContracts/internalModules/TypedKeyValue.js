/**
 NedNetwork | NedNetwork blockchain - https://NED_SITE
 @author: Andrey Nedobylsky (admin@twister-vl.ru)
 */

/**
 * KeyValue that saves types
 */
class TypedKeyValue {

    constructor(name) {
        this.db = new KeyValue(name);
    }

    /**
     * Put value
     * @param key
     * @param value
     */
    put(key, value) {
        return this.db.put(key, JSON.stringify(value));
    }

    /**
     * Get value
     * @param key
     * @return {any}
     */
    get(key) {
        return JSON.parse(this.db.get(key));
    }

}