// The deployment script
const main = async (network) => {
	// Getting the first signer as the deployer
  const [deployer] = await ethers.getSigners();
  // Saving the info to be logged in the table (deployer address)
  var deployerLog = { Label: "Deploying Address", Info: deployer.address };
	// Saving the info to be logged in the table (deployer address)
  var deployerBalanceLog = { 
    Label: "Deployer ETH Balance", 
    Info: (await deployer.getBalance()).toString() 
  };
	// Gets the abi, bytecode & name of the contract
	const Token = await ethers.getContractFactory("Token");
	// Deploys the token
  const token = await Token.deploy();
	// Saving the info to be logged in the table (deployer address)
  var tokenLog = { Label: "Deployed Token Address", Info: token.address };

  console.table([deployerLog, deployerBalanceLog, tokenLog]);
}
// Runs the deployment script, catching any errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });