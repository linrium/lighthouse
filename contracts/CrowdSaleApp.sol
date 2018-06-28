pragma solidity ^0.4.20;

import "./CrowdSale.sol";

contract CrowdSaleApp {
    address public owner;

    event LogCrowdSaleCreated(
        address contractCaller,
        address contractAddr,
        address indexed creator,
        string title,
        string description,
        uint fundingGoalInEthers,
        uint durationInMinutes,
        string thumbnail
    );

    constructor() public {
        owner = msg.sender;
    }

    function createCrowdSale(
        string _title,
        string _description,
        uint _fundingGoalInEthers,
        uint _durationInMinutes,
        string _thumbnail
    )
    public
    returns (bool) {
        address contractAddr = new CrowdSale(_title, _description, _fundingGoalInEthers, _durationInMinutes, _thumbnail);

        emit LogCrowdSaleCreated(
            address(this),
            contractAddr,
            msg.sender,
            _title,
            _description,
            _fundingGoalInEthers,
            _durationInMinutes,
            _thumbnail
        );

        return true;
    }
}