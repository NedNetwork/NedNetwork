
![ES8](https://img.shields.io/badge/es-8-brightgreen.svg)
![GitHub contributors](https://img.shields.io/github/contributors/NedNetwork/NedNetwork.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/NedNetwork/NedNetwork.svg)
![Github search hit counter](https://img.shields.io/github/search/NedNetwork/NedNetwork/goto.svg)
![GitHub top language](https://img.shields.io/github/languages/top/NedNetwork/NedNetwork.svg)
# NedNetwork - NedNetwork Blockchain Node

NedNetwork (NedNetwork) -  Modular blockchain framework. This platform provides super-flexible configuration of each functional link of the network. The network supports the following functions:

+ Flexible network configuration
+ External crypto plugins support for custom cryptography integration
+ 1-dimensional chain configuration
+ Free format blocks. You can store any data up to 15 MB
+ Turing-complete JavaScript smart contracts
+ Support of browsers integration without additional plugins and integration layers. Works by [WebApi framework](https://github.com/NedNetwork/WebApi)
+ 50000 tx/sec tested speed. See [benchmark](benchmark) section
+ Internal consensus mechanism without miners: LCPoA
+ Support for other consensus plugins
+ DApp operating system
+ Special P2P hi-speed messaging protocol - StarWave and StarWaveCrypto for encrypted messaging

## Docs 

Programming guide and references you can found in our [WIKI pages https://github.com/NedNetwork/NedNetwork/wiki](https://github.com/NedNetwork/NedNetwork/wiki)


## Installing

[![npm version](https://badge.fury.io/js/nednetwok.svg)](https://www.npmjs.com/package/nednetwok)

Simplest way:

``npm i -g nednetwok``

Now you can use it as ``nednetwok --config config.json``

## Building Node


#### Dependencies

**NedNetwork platform** depends on Node.js version >= 12.0.0

NPM version >= 5.3.0

For now we recommend build NedNetwork Node for Node.js >= 14

**Building depends on:**

Python >= 2.7

GCC / MinGW / VC++


#### Building

Preparing for work is done by running the command 
```
npm install
```

Now you can start node by command

```
node main.js
```

**If the building ends with an error, delete the node_modules directory before retrying**

## Troubleshooting
**If the building ends with an error, delete the node_modules directory before retrying**

#### Windows.

If the package installation fails, use

```
npm install --global --production windows-build-tools
```
This command will install Visual Studio 2017 build tools.

Then:

Control Panel -> Programs and Components -> Microsoft Visual Studio Installer(run change).

In Visual Studio Installer window, find installed "Visual Studio Build Tools 2017" and click "Change".

In "Visual C++ Build Tools" section.

Check needed options in right panel:

Make sure the "...VC++ 2015.3 v14.00(v140)" option is enabled.


## Communication

Official Telegram group: [https://t.me/NedNetwork](https://t.me/NedNetwork)

Welcome for any descussions and questions!

## Contributing

Hi and welcome!
Please! Read [CONTRIBUTING.md](CONTRIBUTING.md) first.

After reading use the following steps:

1. Fork it ( [https://github.com/NedNetwork/NedNetwork/fork](https://github.com/NedNetwork/NedNetwork/fork) )
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create a new Pull Request

## Maintainers

- [lailune](https://github.com/lailune) Andrey Nedobylsky - maintainer

## Hall of fame

In this section we publish the best contributors.

* Dmitry Elsukov [demndik](https://github.com/demndik)
* Kirill Revenkov [Arucard89](https://github.com/Arucard89)


***

[![https://nodei.co/npm/nednetwork.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/nednetwork.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/nednetwork)
