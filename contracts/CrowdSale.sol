pragma solidity ^0.4.20;

//import "./oraclizeAPI.sol";

contract CrowdSale {
    address public owner;
    string public title;
    string public description;
    uint public fundingGoal;
    uint public amountRaised;
    uint public deadline;
    string public thumbnail;
    bool public fundingGoalReached = false;
    bool public crowdSaleClosed = false;

    mapping(address => uint) public balanceOf;
    address[] public contributors;

    event LogGoalReached(address indexed recipient, uint totalAmountRaised);
    event LogFundTransfer(address indexed backer, uint amount, bool indexed isContribution);

    event LogNewOraclizeQuery(string description);
    event LogCallMySelf(uint totalAmountRaised, bool fundingGoalReached);

    modifier afterDeadline() {
        if (now >= deadline) _;
    }

    constructor(
        string _title,
        string _description,
        uint _fundingGoalInEthers,
        uint _durationInMinutes,
        string _thumbnail
    ) public payable {
        owner = msg.sender;
        title = _title;
        description = _description;
        fundingGoal = _fundingGoalInEthers * 1 ether;
        deadline = now + _durationInMinutes * 1 minutes;
        thumbnail = _thumbnail;

//        OAR = OraclizeAddrResolverI(0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475);

//        uint durationInSeconds = deadline * 1 seconds;
//        oraclize_query(durationInSeconds, "URL", "");
    }

//    function __callback(bytes32 myId, string result) payable public {
//        if (msg.sender != oraclize_cbAddress()) revert();
//        myId;
//        emit LogCallMySelf(amountRaised, fundingGoalReached);
//        result;
//    }

    function() payable public {
        require(!crowdSaleClosed);
        uint amount = msg.value;
        addContributor();
        balanceOf[msg.sender] += amount;
        amountRaised += amount;

        emit LogFundTransfer(msg.sender, amount, true);
    }

    function addContributor() public {
        if(balanceOf[msg.sender] == 0) {
            contributors.push(msg.sender);
        }
    }

    function totalContributors() view public returns (uint) {
        return contributors.length;
    }

    function checkGoalReached() public afterDeadline {
        if (amountRaised >= fundingGoal) {
            fundingGoalReached = true;
            emit LogGoalReached(owner, amountRaised);
        }
        crowdSaleClosed = true;
    }

    function safeWithdrawal() public afterDeadline {
        if (!fundingGoalReached) {
            uint amount = balanceOf[msg.sender];
            balanceOf[msg.sender] = 0;
            if (amount > 0) {
                if (msg.sender.send(amount)) {
                    emit LogFundTransfer(msg.sender, amount, false);
                } else {
                    balanceOf[msg.sender] = amount;
                }
            }
        }

        if (fundingGoalReached && owner == msg.sender) {
            if (owner.send(amountRaised)) {
                emit LogFundTransfer(owner, amountRaised, false);
            } else {
                fundingGoalReached = false;
            }
        }
    }

    function isDeadlineReached() view public returns (bool) {
        return now > deadline;
    }
}