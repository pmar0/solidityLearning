import web3 from "./web3";

// const oldAddress = '0x399529290e26E4B3D96513298d381d94923C9C09';

const address = '0x344E2DE349869E8a41D2Ad2e24c6B129051A1CE9';

const abi = [{
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor",
    "signature": "constructor"
}, {
    "inputs": [],
    "name": "enter",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true,
    "signature": "0xe97dcb62"
}, {
    "inputs": [],
    "name": "getPlayers",
    "outputs": [{
        "internalType": "address payable[]",
        "name": "",
        "type": "address[]"
    }],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0x8b5b9ccc"
}, {
    "inputs": [],
    "name": "owner",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0x8da5cb5b"
}, {
    "inputs": [],
    "name": "pickWinner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x5d495aea"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "name": "players",
    "outputs": [{
        "internalType": "address payable",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0xf71d96cb"
}]

// const oldAbi = [{
//     "constant": false,
//     "inputs": [],
//     "name": "pickWinner",
//     "outputs": [],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
// }, {
//     "constant": true,
//     "inputs": [],
//     "name": "getPlayers",
//     "outputs": [{
//         "name": "",
//         "type": "address[]"
//     }],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
// }, {
//     "constant": true,
//     "inputs": [],
//     "name": "owner",
//     "outputs": [{
//         "name": "",
//         "type": "address"
//     }],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
// }, {
//     "constant": false,
//     "inputs": [],
//     "name": "enter",
//     "outputs": [],
//     "payable": true,
//     "stateMutability": "payable",
//     "type": "function"
// }, {
//     "constant": true,
//     "inputs": [{
//         "name": "",
//         "type": "uint256"
//     }],
//     "name": "players",
//     "outputs": [{
//         "name": "",
//         "type": "address"
//     }],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
// }, {
//     "inputs": [],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "constructor"
// }];

export default new web3.eth.Contract(abi, address);