// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./Mytoken.sol";
// import "./Token1.sol";

contract Staking is ReentrancyGuard {
    Mytoken public myToken;
    //  MyToken public token;
    constructor(Mytoken _token) {
        myToken = _token;
    }
    event Staked(address indexed user, uint256 indexed amount);
    event WithdrewStake(address indexed user, uint256 indexed amount,uint256 indexed timstamp);
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
    error stake__transferFailed();
    error withdraw__transferFailed();
    error claimReward__transferFailed();
    error staking__needMoreThanZero();
    error waitingPeriod_notCompleted();
     error unstakeNot_called();

    receive() external payable {}
    fallback() external payable {}

    modifier updateReward() {
        s_rewardPerTokenStored = rewardPerToken();
        s_lastUpdateTime = block.timestamp;
        s_rewards[msg.sender] = earned(msg.sender);
        s_userRewardsPerToken_Paid[msg.sender] = s_rewardPerTokenStored;
        _;
    }

    modifier needMoreThanZero() {
        if (msg.value == 0) {
            revert staking__needMoreThanZero();
        }
        _;
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

    function rewardPerToken() public view returns (uint256) {
        if (s_totalSupply == 0) {
            return s_rewardPerTokenStored;
        }
        return
            s_rewardPerTokenStored +
            (((block.timestamp - s_lastUpdateTime) * RewardRate * 1e18) /
                s_totalSupply);
    }

    function stake()
        public 
        updateReward()
        needMoreThanZero()
        nonReentrant
        payable 
    {   
        uint256 amount=msg.value;
        s_userStakedAmount[msg.sender] =
        s_userStakedAmount[msg.sender] +
            amount;
        s_totalSupply = s_totalSupply + amount;
          (bool sent, ) = (payable(address(this))).call{value: msg.value}("");
        s_userStakedAmount[msg.sender]=msg.value;
        // StackingAmount=msg.value;
        require(sent, "Failed to send Ether");
        uint256 y=(93)*(msg.value)/100;
        myToken.mint(msg.sender, y);
        // emit event
        emit Staked(msg.sender, msg.value);
    }

    uint256 public  unstakeTimestamp;
    function unstake(uint256 amount) public {
            require(s_userStakedAmount[msg.sender] >=0, "No amount staked");
            unstakeTimestamp=block.timestamp;
            unboundingPeriod=1000;
            emit WithdrewStake(msg.sender, amount, block.timestamp);
    }


    function withdraw(uint256 amount)
        external
        updateReward()
        // needMoreThanZero()
    {   if( unboundingPeriod!=1e18 && s_userStakedAmount[msg.sender]>=amount){
        withdrawTimeStamp[msg.sender] = block.timestamp;
        s_userStakedAmount[msg.sender] =
            s_userStakedAmount[msg.sender] -
            amount;
        s_totalSupply = s_totalSupply - amount;
        myToken.burn(msg.sender,amount);
        // emit WithdrewStake(msg.sender, amount);
        emit RewardsClaimed(msg.sender,amount);
        myToken.mint(msg.sender, (((amount * (1)) / 10) + amount));
    }
    else{
        revert unstakeNot_called();
    }
    }

    function getTotalSupply() public view returns(uint256){
        return s_totalSupply;
    }
     function getRewardsPerTokenShared() public view returns(uint256){
        return s_rewardPerTokenStored;
    }
     function getUserBalance() public view returns(uint256){
        return s_userStakedAmount[msg.sender];
    }

     function getUserRewardsPerToken() public view returns(uint256){
        return s_userRewardsPerToken_Paid[msg.sender];
    }

}
