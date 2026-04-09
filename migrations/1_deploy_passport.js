const PassportRegistry = artifacts.require("PassportRegistry");

module.exports = async function (deployer) {
  await deployer.deploy(PassportRegistry);
};
