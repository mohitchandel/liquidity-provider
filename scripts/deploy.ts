import { ethers } from "hardhat";

async function main() {
  
// Deploying first token 
  const FirstToken = await ethers.getContractFactory("FirstToken");
  const firstToken = await FirstToken.deploy();
  await firstToken.deployed();

  // Deploying second token 
  const SecondToken = await ethers.getContractFactory("SecondToken");
  const secondToken = await SecondToken.deploy();
  await secondToken.deployed();

  // Deploying contract 
  const UniswapTest = await ethers.getContractFactory("UniswapTest");
  const contract = await UniswapTest.deploy(firstToken.address, secondToken.address);
  await contract.deployed();

  console.log("first token:"+firstToken.address," second token:"+secondToken.address, " Uniswap Test contract:"+contract.address)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
