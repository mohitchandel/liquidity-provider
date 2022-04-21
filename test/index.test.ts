import { expect } from "chai";
import { artifacts, ethers } from "hardhat";

let admin: { address: any; };
let contract: any;
let firstToken: any;
let secondToken: any;


describe("Add Liquidity", function () {

  beforeEach(async function () {
    [admin] = await ethers.getSigners();
    // Deploying first token 
    const FirstToken = await ethers.getContractFactory("FirstToken");
    firstToken = await FirstToken.deploy();
    await firstToken.deployed();

    // Deploying second token 
    const SecondToken = await ethers.getContractFactory("SecondToken");
    secondToken = await SecondToken.deploy();
    await secondToken.deployed();

    // Deploying contract 
    const UniswapTest = await ethers.getContractFactory("UniswapTest");
    contract = await UniswapTest.deploy(firstToken.address, secondToken.address);
    await contract.deployed();

  });


  it("Should add liquidity", async function () {
    await firstToken.approve(contract.address, ethers.BigNumber.from("1000000000000000000000"))
    await secondToken.approve(contract.address, ethers.BigNumber.from("1000000000000000000000"))

    const addLiquidity = await contract.addLiquidity(ethers.BigNumber.from("100000000000000000000"), ethers.BigNumber.from("100000000000000000000"))
    await addLiquidity.wait()
    expect(addLiquidity).to.emit(contract, "AddLiquidityEvent");
  });

  it("Should remove liquidity", async function () {
    await firstToken.approve(contract.address, ethers.BigNumber.from("1000000000000000000000"))
    await secondToken.approve(contract.address, ethers.BigNumber.from("1000000000000000000000"))

    const addLiquidity = await contract.addLiquidity(ethers.BigNumber.from("100000000000000000000"), ethers.BigNumber.from("100000000000000000000"))
    await addLiquidity.wait()
    expect(addLiquidity).to.emit(contract, "AddLiquidityEvent")

    const removeLiquidity = await contract.removeLiquidity(firstToken.address, secondToken.address)
    await removeLiquidity.wait()
    expect(removeLiquidity).to.emit(contract, "RemoveLiquidityEvent")
  });

  it("Should swap ETh to token", async function () {
    await firstToken.approve(contract.address, ethers.BigNumber.from("1000000000000000000000"))
    await secondToken.approve(contract.address, ethers.BigNumber.from("1000000000000000000000"))
    const daiToken = "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735";

    const swapToken = await contract.swapEThforTokens(ethers.BigNumber.from("1000000000000000000"), daiToken, { from: admin.address, value: ethers.BigNumber.from("100000000000000000000") })
    await swapToken.wait()
    expect(swapToken).to.emit(contract, "TokenSwapEvent")
  });

  it("Should swap tokens for tokens", async function () {
    await firstToken.approve(contract.address, ethers.BigNumber.from("1000000000000000000000"))
    await secondToken.approve(contract.address, ethers.BigNumber.from("1000000000000000000000"))

    const addLiquidity = await contract.addLiquidity(ethers.BigNumber.from("100000000000000000000"), ethers.BigNumber.from("100000000000000000000"))
    await addLiquidity.wait()
    expect(addLiquidity).to.emit(contract, "AddLiquidityEvent")

    const swapToken = await contract.swapTokens(ethers.BigNumber.from("1000000000000000000"), firstToken.address, secondToken.address)
    await swapToken.wait()
    expect(swapToken).to.emit(contract, "TokenSwapEvent")
  });

});
