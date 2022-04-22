## Uniswap Smart Contract

This Project is deployed on the Rinkeby testnet

ERC20 Token (First Token) address: [0xE3Cc09f9e04EEF56d715EA610b319F92384f0F89](https://rinkeby.etherscan.io/address/0xE3Cc09f9e04EEF56d715EA610b319F92384f0F89)

ERC20 Token (Second Token) address: [0x0Dc74d9A3D5970a3fA53Da955BCE49EE8DeDa4BD](https://rinkeby.etherscan.io/address/0x0Dc74d9A3D5970a3fA53Da955BCE49EE8DeDa4BD)

Liquidity contract address: [0xC717E357aDCBA3dB68Ee3572A93dA1C51505ccD4](https://rinkeby.etherscan.io/address/0xC717E357aDCBA3dB68Ee3572A93dA1C51505ccD4)

### Usage

Before running any command, make sure to install dependencies:

`npm install`

#### Compile

Compile the smart contracts with Hardhat: 

`npx hardhat compile`

#### Test

Run the tests:

`npx hardhat test`

#### Deploy

deploy contract to network: 

`npx hardhat run --network rinkeby scripts/deploy.ts`


Liquidity provider smart contract will be created after the creation of two ERC20 token (First Token, Second Token) because the liquidity smart contract need parameters of both tokens address in its constructor.

`constructor(ERC20 _tokenA, ERC20 _tokenB) {}`

functions need to call before adding liquidity in both ERC20 tokens

```
approve(address spender, uint256 amount)
``` 

this function is used to approve contract address to spend on behalf of user.

The function takes the following arguments:

- `spender`: This is the address of the spender to whom the approval rights should be given or revoked from the approver.
- `amount`: This is amount of tokens can be spend.


### How to add liquidity

In liquidity provider smart contract function `addLiquidity()` is used to add liquidity for the ERC20 tokens.

this function has following arguments:

- `uint256 _amountA` : It is the token amount of first token.
- `uint256 _amountB` : It is the token amount of second token.

testnet transaction - [0x51f12940f0ebd187709670d6a719919304bef24fbf6712f0bfa5ff7ace09dd34](https://rinkeby.etherscan.io/tx/0x51f12940f0ebd187709670d6a719919304bef24fbf6712f0bfa5ff7ace09dd34)


### How to remove liquidity

The `removeLiquidity()` function is used to complete the process of removing liquidity

This function get the pair address and get the provided liquidity amount and then run the uniswap router function of `removeLiquidity`

testnet transaction - [0x49e672acfa7273969f627e32ef157ccc764397890373c56ac29d3026311f889d](https://rinkeby.etherscan.io/tx/0x49e672acfa7273969f627e32ef157ccc764397890373c56ac29d3026311f889d)


### How to swap ETH for tokens
In liquidity provider smart contract function `swapEThforTokens()` is used to perform swap of ETH to ERC20 tokens.

this function has following arguments:

- `uint256 _ethAmount` : It is the amount of ETH.
- `address _tokenAddress` : It is the address of buy token.

testnet transaction - [0x4209b7ae6970acc7a0c0b1b684b55dfd1237d483c4308cc4f8934e0d98851105](https://rinkeby.etherscan.io/tx/0x4209b7ae6970acc7a0c0b1b684b55dfd1237d483c4308cc4f8934e0d98851105)

### How to swap tokens for tokens
In liquidity provider smart contract function `swapTokens()` is used to perform swap of two ERC20 tokens.

this function has following arguments:

- `uint256 _tokenAmount` : It is the token amount of sell token.
- `address _tokenA` : It is the address of sell token.
- `address _tokenB`: It is the address of buy token.

testnet transaction - [0x3d09aab4c07dfcf9f0c2d77c3aeef7ac0014f207413b68b5419913e716d9926b](https://rinkeby.etherscan.io/tx/0x3d09aab4c07dfcf9f0c2d77c3aeef7ac0014f207413b68b5419913e716d9926b)
