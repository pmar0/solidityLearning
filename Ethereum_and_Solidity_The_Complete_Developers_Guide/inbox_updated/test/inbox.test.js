const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { abi, evm } = require('../compile');

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;
const INTIAL_MESSAGE = 'Hey dood'

beforeEach(async () => {
    //Get a list of all accounts
    accounts = await web3.eth.getAccounts()
    
    //Use one of the above accounts to deploy the contract
    inbox = await new web3.eth.Contract(abi)
    .deploy({data: evm.bytecode.object, arguments: [INTIAL_MESSAGE]})
    .send({from: accounts[0], gas: '1000000'})
});

describe('Inbox', () =>{
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has initial message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INTIAL_MESSAGE)
    });

    it('can set message', async () => {
        const NEW_MESSAGE = 'oi'
        await inbox.methods.setMessage(NEW_MESSAGE).send({ from: accounts[0] });
        
        const message = await inbox.methods.message().call();
        assert.equal(message, NEW_MESSAGE)
    });
});