// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";                                                                                               
contract Mytoken is ERC20 {
    constructor() ERC20("xConflux", "xCFX") {
    }
    
     function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
     function burn(address to,uint256 amount) external {
        _burn(to, amount);
    }
}