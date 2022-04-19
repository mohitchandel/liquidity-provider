import { expect } from "chai";
import { artifacts, ethers } from "hardhat";

let admin: { address: any; };
let contract : any;
let firstToken : any;
let secondToken : any;


describe("Add Liquidity", function () {

  beforeEach(async function () {

    // Deploying first token 
    const FirstToken = await ethers.getContractFactory("FirstToken");
    firstToken = await FirstToken.deploy();
    await firstToken.deployed();

    // Deploying second token 
    const SecondToken = await ethers.getContractFactory("SecondToken");
    secondToken = await SecondToken.deploy();
    await secondToken.deployed();

    // Deploying contract 
    const LiquidityProvider = await ethers.getContractFactory("LiquidityProvider");
    contract = await LiquidityProvider.deploy(firstToken.address, secondToken.address);
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

    const removeLiquidity = await contract.removeLiquidity()
    await removeLiquidity.wait()
    expect(removeLiquidity).to.emit(contract, "RemoveLiquidityEvent")
  });

});
