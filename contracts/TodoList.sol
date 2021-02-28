// pragma solidity ^0.5.5;

// contract TodoList {
//     unit public taskCount = 0;
// }

// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract TodoList {
    uint256 public taskCount = 0;

    struct Task {
        uint256 id;
        string content;
        bool completed;
    }

    mapping(uint256 => Task) public tasks;

    constructor() public {
        createTask("Check out this ethereum app!");
    }

    function createTask(string memory _content) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _content, false);
    }
}
