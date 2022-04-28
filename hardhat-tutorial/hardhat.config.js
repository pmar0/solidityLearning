require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
const INFURA_API_KEY = process.env.ROPSTEN_API;

// Replace this private key with your Ropsten account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Be aware of NEVER putting real Ether into testing accounts
const ROPSTEN_PRIVATE_KEY = process.env.KEY;

module.exports = {
  solidity: "0.7.3",
  networks: {
    ropsten: {
      url: INFURA_API_KEY,
      accounts: [`${ROPSTEN_PRIVATE_KEY}`]
    }
  }
};