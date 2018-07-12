const HDWalletProvider = require("truffle-hdwallet-provider");

const infura_apikey = "Rg62a8raCowitcYSqAkd";
const mnemonic = "inner hungry dry thunder swear item phrase fiber ladder enroll genius mimic";

module.exports = {
	networks: {
		development: {
			host: "127.0.0.1",
			port: 7545,
			network_id: "*" // Match any network id
		},
	}
};