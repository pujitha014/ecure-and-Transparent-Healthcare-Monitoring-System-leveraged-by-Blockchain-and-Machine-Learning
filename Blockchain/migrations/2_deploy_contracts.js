const PrescriptionContract = artifacts.require("Healthcare");

module.exports = function (deployer) {
    deployer.deploy(PrescriptionContract);
};
