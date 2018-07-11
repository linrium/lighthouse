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

Build and migration smart contract to local blockchain
```sh
$ truffle compile
$ truffle migrate
```

Install [MetaMask](https://metamask.io/) on your browser and import keys from [Ganache](https://truffleframework.com/ganache) to MetaMask. After that, select **Custom RPC** and enter `http://127.0.0.1:7545` to **New RPC URL** then click **Save**.

And start local server
```sh
$ yarn start
```
