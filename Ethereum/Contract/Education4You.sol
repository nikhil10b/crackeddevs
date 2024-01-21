// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Education4You {
    address public owner;
    mapping(address => bool) public enrolledStudents;

    event StudentEnrolled(address student);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function enroll() public {
        require(!enrolledStudents[msg.sender], "Student is already enrolled");
        enrolledStudents[msg.sender] = true;
        emit StudentEnrolled(msg.sender);
    }

    function isEnrolled(address student) external view returns (bool) {
        return enrolledStudents[student];
    }
}
