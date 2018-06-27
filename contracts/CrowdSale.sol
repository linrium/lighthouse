pragma solidity ^0.4.20;

contract CrowdSale {
    address public owner;
    uint public fundingGoal;
    uint public amountRaised;
    uint public deadline;
    bool fundingGoalReached = false;
    bool crowdSaleClosed = false;
    mapping(address => uint) public balanceOf;

    event GoalReached(address recipient, uint totalAmountRaised);
    event FundTransfer(address backer, uint amount, bool isContribution);

    modifier afterDeadline() {
        if (now >= deadline) _;
    }

    constructor(
        uint _fundingGoalInEthers,
        uint _durationInMinutes
    ) public {
        owner = msg.sender;
        fundingGoal = _fundingGoalInEthers * 1 ether;
        deadline = now + _durationInMinutes * 1 minutes;
    }

    function () payable public {
        require(!crowdSaleClosed);
        uint amount = msg.value;
        balanceOf[msg.sender] += amount;
        amountRaised += amount;
        emit FundTransfer(msg.sender, amount, true);
    }

    function checkGoalReached() public afterDeadline {
        if (amountRaised >= fundingGoal) {
            fundingGoalReached = true;
            emit GoalReached(owner, amountRaised);
        }
        crowdSaleClosed = true;
    }
    
    function safeWithdrawal() public afterDeadline {
        if (!fundingGoalReached) {
            uint amount = balanceOf[msg.sender];
            balanceOf[msg.sender] = 0;
            if (amount > 0) {
                if (msg.sender.send(amount)) {
                    emit FundTransfer(msg.sender, amount, false);
                } else {
                    balanceOf[msg.sender] = amount;
                }
            }
        }

        if (fundingGoalReached && owner == msg.sender) {
            if(owner.send(amountRaised)) {
                emit FundTransfer(owner, amountRaised, false);
            } else {
                fundingGoalReached = false;
            }
        }
    }
}