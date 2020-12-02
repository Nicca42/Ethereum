require("@nomiclabs/hardhat-waffle");
// env reader
require("dotenv").config();

/**
 * API key for using Infura. To generate keys go to https://infura.io/ 
 * @notice  Never hard code API keys within a file that is tracked by git.
 *          This file is tracked by git, as such we pull the API keys from
 *          the `.env` file. 
 */
const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;

/**
 * Private key of deployer
 * @notice  Never hard code private keys within a file that is tracked by git.
 *          This file is tracked by git, as such we pull the private keys from
 *          the `.env` file. 
 */
const ROPSTEN_PRIVATE_KEY = process.env.ROPSTEN_PRIVATE_KEY;

module.exports = {
  solidity: "0.7.3",
  networks: {
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [`0x${ROPSTEN_PRIVATE_KEY}`]
    }
  }
};