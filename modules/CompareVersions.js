/**
 * Module for compare versions
 *
 */

'use strict';

const semver = require('semver');

class CompareVersions {
    constructor(isPathFull) {
        this.prePath = isPathFull ? '' : __dirname;
        this.keys = {
            NedNetwork: ['engines', 'NedNetwork'],
        };
    }

    readNedNetworkMinVersionNeeded(path) {
        let pluginInfo = require(this.prePath + path + '/package.json');

        return ((pluginInfo || {})[this.keys.NedNetwork[0]] || {})[this.keys.NedNetwork[1]];
    }

    isMinimumVersionMatch(minVersionNeeded, currVersion) {
        minVersionNeeded = semver.minVersion(minVersionNeeded).version;

        return semver.lte(minVersionNeeded, currVersion);
    }
}

module.exports = CompareVersions;