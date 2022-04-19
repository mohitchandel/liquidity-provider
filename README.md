## Liquidity Smart Contract

This Project is deployed on the Rinkeby testnet

ERC20 Token (First Token) address: [0x314D39d60121482490F8982bd6b7dC208C335433](https://rinkeby.etherscan.io/address/0x314D39d60121482490F8982bd6b7dC208C335433)

ERC20 Token (Second Token) address: [0xc29C8e2675c6c53AE13572a3C200d16574a405f4](https://rinkeby.etherscan.io/address/0xc29C8e2675c6c53AE13572a3C200d16574a405f4)

Liquidity contract address: [0x4Dd5f61D06e572083C0732F6DB7f522a01A200bC](https://rinkeby.etherscan.io/address/0x4Dd5f61D06e572083C0732F6DB7f522a01A200bC)

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

`npx hardhat run --network rinkeby scripts/deploy.js`


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


### How to remove liquidity

The `removeLiquidity()` function is used to complete the process of removing liquidity

This function get the pair address and get the provided liquidity amount and then run the uniswap router function of `removeLiquidity`
