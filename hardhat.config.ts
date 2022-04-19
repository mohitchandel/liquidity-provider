import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
const conf = require("./secret");

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.1",
  networks: {
    hardhat:{
      forking: {
        url: "https://eth-rinkeby.alchemyapi.io/v2/PEZxQoww7t9wiKhPXGGF3eKnbf_M_4e4",
      }
    },
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/PEZxQoww7t9wiKhPXGGF3eKnbf_M_4e4" || "",
      accounts: conf.PRIVATE_KEY !== undefined ? [conf.PRIVATE_KEY] : [],
    },
  },
};

export default config;
