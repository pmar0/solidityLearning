pragma solidity ^0.4.17;

contract Lottery {
    address public owner;
    address[] public players;

    constructor() public {
        owner = msg.sender;
    }

    modifier isOwner() {
        require(msg.sender == owner);
        _;
    }

    function enter() public payable {
        require(msg.value >= .01 ether);

        players.push(msg.sender);
    }

    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, now, players)));
    }

    function pickWinner() public isOwner {
        uint index = random() % players.length;
        players[index].transfer(address(this).balance);
        players = new address[](0);
    }

    function getPlayers() public view isOwner returns (address[]) {
        return players;
    }
}