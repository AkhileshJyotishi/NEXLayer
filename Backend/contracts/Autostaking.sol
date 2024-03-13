// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Mytoken.sol";
import "./Mytoken1.sol";
import "./Staking.sol";
import "./Restaking1.sol";

contract Autostaking {
    Mytoken public myToken;
    Mytoken1 public myToken1;
    Staking public staking;
    Restaking1 public restaking1;

    constructor(
        Mytoken _token,
        Mytoken1 _token1,
        Staking _staking,
        Restaking1 _restaking1
    ) {
        myToken = _token;
        myToken1 = _token1;
        staking = _staking;
        restaking1 = _restaking1;
    }

    // receive() external payable {}
    // fallback() external payable {}
    function autostaking() public payable {
        // Forward the received ether to the staking contract
        (bool success, ) = address(staking).call{value: msg.value / 2}(
            abi.encodeWithSignature("stake()")
        );
        require(success, "Staking failed");

        // Assuming ReStaking's stake function also requires ether
        (success, ) = address(restaking1).call{value: msg.value / 2}(
            abi.encodeWithSignature("stake()")
        );
        require(success, "ReStaking failed");
    }

    function mintTokensForStacker(uint256 amount) public {
        myToken.mint(msg.sender, amount);
    }
}
