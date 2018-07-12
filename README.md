# Lighthouse

### Installation

Lighthouse requires [Node.js](https://nodejs.org/) v8+ and [Yarn](https://yarnpkg.com/lang/en/) to run.

Install [Truffle](https://truffleframework.com/)
```sh
$ npm install -g truffle
```

Download and install [Ganache](https://truffleframework.com/ganache)

Install the dependencies and devDependencies and start the server.

```sh
$ cd lighthouse
$ yarn
```

Install and run Oraclize local

```sh
$ cd ethereum-bridge
$ yarn
$ node bridge -a 9 -H 127.0.0.1 -p 7545 --dev
```

Add `OAR = OraclizeAddrResolverI(EnterYourOarCustomAddress);` to your contract constructor, example:
Where `EnterYourOarCustomAddress` is the address resolver generated when you have run the script
![OAR](https://imgur.com/wTenrvK.jpg)
Copy this line `OAR = OraclizeAddrResolverI(0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475);` and paste to file `CrowdSale.sol` in folder `contracts`
![constructor](https://imgur.com/t9d7eI5.jpg)

Build and migration smart contract to local blockchain
```sh
$ truffle compile
$ truffle migrate
```

Install [MetaMask](https://metamask.io/). After that, select **Custom RPC** and enter `http://127.0.0.1:7545` to **New RPC URL** then click **Save**.
Click to *key* icon in [Ganache](https://truffleframework.com/ganache) to show popup and import to Metamask
![Key](https://imgur.com/a6vQdVI.jpg)

And start local server
```sh
$ yarn start
```
