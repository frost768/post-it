const PostIt = artifacts.require('PostIt');

module.exports = function(deployer) {
  deployer.deploy(PostIt);
};