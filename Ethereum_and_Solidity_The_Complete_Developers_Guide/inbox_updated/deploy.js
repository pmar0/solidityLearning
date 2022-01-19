require("dotenv").config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./compile');

const provider = new HDWalletProvider(
    process.env.WALLET,
    process.env.NETWORK
);

const web3 = new Web3(provider);

const deploy = async () =>{
    const accounts = await web3.eth.getAccounts();

    console.log('Deploying from acocunt:',accounts[1])
    const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ['Hi'] })
    .send({ gas: '1000000', from: accounts[1] });

    console.log('Contract deployed to: ', result.options.address);
    provider.engine.stop();
};
deploy();