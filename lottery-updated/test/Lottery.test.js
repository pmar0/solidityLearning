const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { abi, evm } = require('../compile');

const web3 = new Web3(ganache.provider());

let lottery;
let accounts;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ from: accounts[0], gas: '1000000'})
});

describe('Lottery Contract', () =>{
    it('deploys a contract', () => {
        assert.ok(lottery.options.address);
    });

    it('one enter lottery', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length);
    });

    it('multiple enter lottery', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });
        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.02', 'ether')
        });
        await lottery.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei('0.02', 'ether')
        });
        
        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(3, players.length);
    });

    it('requires min ether to enter', async () => {
        try {
            await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.002', 'ether')
            });
        } catch (err) {
            assert(err);
            return;
        }
        assert(false);
    });

    it('requires owner to pick winner', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });

        try {
            await lottery.methods.pickWinner().send({
                from: accounts[1]
            });
        } catch (err) {
            assert(err);
            return;
        }
        assert(false);
    });

    it('the full shabang (sends money to winner and clears player array)', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('2', 'ether')
        });

        /* sends money to player block begin */
        const initialBalance = await web3.eth.getBalance(accounts[0]);
        await lottery.methods.pickWinner().send({ from: accounts[0] });
        const finalBalance = await web3.eth.getBalance(accounts[0]);
        const diff = finalBalance - initialBalance;
        // console.log('gas',diff);
        assert(diff > web3.utils.toWei('1.8', 'ether'));
        /* sends money to player block end */

        /* contract has zero bal block begin */
        const contractBal = await web3.eth.getBalance(lottery.options.address);
        assert.equal(0, contractBal);
        /* contract has zero bal block end */

        /* contract has no players block begin */
        const players = await lottery.methods.getPlayers().call({ from: accounts[0] });
        assert.equal(0, players.length);
        /* contract has no players block end */
    });
});