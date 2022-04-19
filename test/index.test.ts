import { expect } from "chai";
import { artifacts, ethers } from "hardhat";
const config = require("../config.ts");

describe("Add Liquidity", function () {

  let admin: { address: any; };
  let contract : any;
  let tokenA : any;
  let tokenB : any;

  beforeEach(async function () {
    // getting admin address
    [admin] = await ethers.getSigners();

    tokenA = "0xc778417E063141139Fce010982780140Aa0cD5Ab"; // WETH
    tokenB = "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b"; // USDC

    // Deploying contract 
    const LiquidityProvider = await ethers.getContractFactory("LiquidityProvider");
    contract = await LiquidityProvider.deploy(config.uniswapFactory, config.uniswapRouter);
    await contract.deployed();

  });


  it("Should add liquidity", async function () {
    // Minting new tokens
    const addLiquidity = await contract.addLiquidity(tokenA, tokenB, 10000, 10000)
    await addLiquidity.wait()
  });
});
