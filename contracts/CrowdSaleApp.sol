pragma solidity ^0.4.20;

import "./CrowdSale.sol";

contract CrowdSaleApp {
    address public owner;

    event LogCrowdSaleCreated(
        address contractAddr,
        address creator,
        string _title,
        string _description,
        uint _fundingGoalInEthers,
        uint _durationInMinutes
    );

    constructor() public {
        owner = msg.sender;
    }

    function createCrowdSale(
        string _title,
        string _description,
        uint _fundingGoalInEthers,
        uint _durationInMinutes
    )
    public
    returns (bool) {
        address contractAddr = new CrowdSale(_title, _description, _fundingGoalInEthers, _durationInMinutes);

        emit LogCrowdSaleCreated(
            contractAddr,
            msg.sender,
            _title,
            _description,
            _fundingGoalInEthers,
            _durationInMinutes
        );

        return true;
    }
}