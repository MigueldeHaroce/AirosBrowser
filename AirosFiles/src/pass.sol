// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Keychain {
    mapping(string => string) private keychain;

    event KeyValuePairSet(string key, string value);

    function setKey(string memory key, string memory value) public {
        require(bytes(key).length > 0, "Key cannot be empty");
        keychain[key] = value;
        emit KeyValuePairSet(key, value); // Emit an event after setting the key-value pair
    }

    function getValue(string memory key) public view returns (string memory) {
        return keychain[key];
    }
}
