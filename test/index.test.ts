import { expect } from "chai";
import { artifacts, ethers } from "hardhat";
const config = require("../config.ts");

describe("Add Liquidity", function () {

  let admin;
  let tokenA;
  let tokenB;

  beforeEach(async function () {
    // getting admin address
    [admin] = await ethers.getSigners();

    tokenA = "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735"; // DAI
    tokenB = "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b"; // USDC

    // Deploying contract 
    const LiquidityProvider = await ethers.getContractFactory("LiquidityProvider");
    const liquidity = await LiquidityProvider.deploy(config.uniswapFactory, config.uniswapRouter);
    await liquidity.deployed();

  });


  it("Should add liquidity", async function () {
    
  });
});
