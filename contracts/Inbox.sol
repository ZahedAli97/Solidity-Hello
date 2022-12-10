pragma solidity ^0.4.17; // Defines the version of solidity

contract Inbox{ // Defines new contract (class)
    string public message; // Declares all instance/storage variable // Public automatically creates get function

    function Inbox(string initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }

}