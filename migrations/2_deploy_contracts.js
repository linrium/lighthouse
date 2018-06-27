const TestApp = artifacts.require("./TestApp.sol");
const CrowdSale = artifacts.require("./CrowdSale.sol");

module.exports = function(deployer) {
  deployer.deploy(TestApp);
  deployer.deploy(CrowdSale, 2, 5);
};
