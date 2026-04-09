// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract PassportRegistry {
    struct Passport {
        string dataHash;
        bool isValid;
        bool exists;
    }

    mapping(address => Passport) private passports;

    event PassportIssued(address indexed user, string dataHash);
    event PassportRevoked(address indexed user);

    function issuePassport(address user, string memory dataHash) public {
        require(user != address(0), "Invalid user address");
        passports[user] = Passport({
            dataHash: dataHash,
            isValid: true,
            exists: true
        });
        emit PassportIssued(user, dataHash);
    }

    function verifyPassport(address user, string memory dataHash) public view returns (bool) {
        Passport memory passport = passports[user];
        return passport.exists && passport.isValid && keccak256(bytes(passport.dataHash)) == keccak256(bytes(dataHash));
    }

    function revokePassport(address user) public {
        require(passports[user].exists, "Passport does not exist");
        passports[user].isValid = false;
        emit PassportRevoked(user);
    }
}
