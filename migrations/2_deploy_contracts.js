// const TestApp = artifacts.require("./TestApp.sol");
// const CrowdSale = artifacts.require("./CrowdSale.sol");
const CrowdSaleApp = artifacts.require("./CrowdSaleApp.sol");

module.exports = function(deployer) {
  // deployer.deploy(TestApp);
  // deployer.deploy(CrowdSale, 2, 1);
  deployer.deploy(CrowdSaleApp);
};
