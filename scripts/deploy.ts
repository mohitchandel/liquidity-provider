import { ethers } from "hardhat";
const config = require("../config.ts");

async function main() {
  
  const LiquidityProvider = await ethers.getContractFactory("LiquidityProvider");
  const liquidity = await LiquidityProvider.deploy(config.uniswapFactory, config.uniswapRouter);

  await liquidity.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
