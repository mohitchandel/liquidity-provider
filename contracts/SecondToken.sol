// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SecondToken is ERC20 {
    constructor() ERC20("SecondToken", "STK") {
        _mint(msg.sender, 1000 * (10 ** 18));
    }
}