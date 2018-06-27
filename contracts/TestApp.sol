pragma solidity ^0.4.20;

import "./oraclizeAPI.sol";

contract TestApp is usingOraclize {
    string public EURGBP;
    event LogConstructorInitiated(string nextStep);
    event LogPriceUpdated(string price);
    event LogNewOraclizeQuery(string description);
    event LogSendTransaction(uint value);

    constructor() public payable {
        // oraclize_query(60, "URL", "");
        OAR = OraclizeAddrResolverI(0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475);
        emit LogConstructorInitiated("Constructor was initiated. Call 'updatePrice()' to send the Oraclize Query.");
    }

    function __callback(bytes32 myid, string result) payable public {
        if (msg.sender != oraclize_cbAddress()) revert();
        EURGBP = result;
        emit LogPriceUpdated(result);
        myid;
        result;
    }

    function updatePrice() public payable {
        if (oraclize_getPrice("URL") > address(this).balance) {
            emit LogNewOraclizeQuery("Oraclize query was NOT sent, please add some ETH to cover for the query fee");
        } else {
            emit LogNewOraclizeQuery("Oraclize query was sent, standing by for the answer..");
            oraclize_query("URL", "json(http://data.fixer.io/api/latest?symbols=USD,GBP&access_key=d9111756bd8b6cf4e17aec6098b930c6&format=1).rates.GBP");
        }
    }

    function () payable public {
        emit LogSendTransaction(msg.value);
    }

    function getBalance() view public returns (uint) {
        return address(this).balance;
    }
}
