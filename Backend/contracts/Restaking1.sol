// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Mytoken.sol";
import "./Mytoken1.sol";

contract Restaking1 {
    Mytoken public myToken;
    Mytoken1 public anotherToken;
     event Staked(address indexed user, uint256 indexed amount);
    event WithdrewStake(address indexed user, uint256 indexed amount);
    event RewardsClaimed(address indexed user, uint256 indexed amount);
    uint256 public RewardRate=100;
    uint256 public s_totalSupply;
    uint256 public s_lastUpdateTime; // everytime we call stake,withdraw,claim reward we need to update time;
    uint256 public s_rewardPerTokenStored;
    uint256 public unboundingPeriod = 1e18;
    //   uint256 public withdrawTimeStamp;

    mapping(address => uint256) s_userStakedAmount;
    mapping(address => uint256) s_rewards;
    mapping(address => uint256) s_userRewardsPerToken_Paid;
    mapping(address => uint256) withdrawTimeStamp;
    mapping (address=>uint256) public StakersBalance;

    modifier updateReward() {
        s_rewardPerTokenStored = rewardPerToken();
        s_lastUpdateTime = block.timestamp;
        s_rewards[msg.sender] = earned(msg.sender);
        s_userRewardsPerToken_Paid[msg.sender] = s_rewardPerTokenStored;
        _;
    }

    error stake__transferFailed();
    error withdraw__transferFailed();
    error claimReward__transferFailed();
    error staking__needMoreThanZero();
    error waitingPeriod_notCompleted();
     error unstakeNot_called();

    constructor(Mytoken _myToken, Mytoken1 _anotherToken) {
        myToken = _myToken;
        anotherToken = _anotherToken;
    }
     function earned(address account) public view returns (uint256) {
        uint256 currentBalance = s_userStakedAmount[account];
        uint256 amountPaid = s_userRewardsPerToken_Paid[account]; // used while claim reward function call
        uint256 currentRewardPerToken = rewardPerToken();
        uint256 pastRewards = s_rewards[account];
        return
            ((currentBalance * (currentRewardPerToken - amountPaid)) / 1e18) +
            pastRewards;
    }

    function transferTokens(uint256 _amount) public  {
        s_userStakedAmount[msg.sender] =
        s_userStakedAmount[msg.sender] +
            _amount;
        s_totalSupply = s_totalSupply + _amount;
          myToken.mint(address(this), _amount);
        myToken.burn(msg.sender, _amount);
        anotherToken.mint(msg.sender, _amount);
    }

     function rewardPerToken() public view returns (uint256) {
        if (s_totalSupply == 0) {
            return s_rewardPerTokenStored;
        }
        return
            s_rewardPerTokenStored +
            (((block.timestamp - s_lastUpdateTime) * RewardRate * 1e18) /
                s_totalSupply);
    }

        uint256 public  unstakeTimestamp;
    function unstake(uint256 amount) public {
            require(s_userStakedAmount[msg.sender] >=0, "No amount staked");
            unstakeTimestamp=block.timestamp;
            unboundingPeriod=1000;
             emit WithdrewStake(msg.sender,  amount);
    }

    function withdraw(uint256 amount)
    external
    updateReward()
        // needMoreThanZero()
    {   if( unboundingPeriod!=1e18){
        withdrawTimeStamp[msg.sender] = block.timestamp;
        s_userStakedAmount[msg.sender] =
            s_userStakedAmount[msg.sender] -
            amount;
        s_totalSupply = s_totalSupply - amount;
        emit RewardsClaimed(msg.sender, amount);
        myToken.mint(msg.sender, (((amount * (1)) / 10) + amount));
        myToken.burn(msg.sender,amount);
    }
    else{
        revert unstakeNot_called();
    }
    }
    function getAnotherTokenBalance() public  view returns (uint256) {
        return myToken.balanceOf(address(this));
    }
    function mintTokensForStacker(uint256 amount) public  {
            myToken.mint(msg.sender, amount);
    }
}
