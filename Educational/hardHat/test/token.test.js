const { expect } = require("chai");

describe("Token contract", function() {
  describe("Waffle tests", function() {
    // Creating the token instance object (to be used in all tests)
    let hardHatToken;
    // The signers that will be interacting with the contract
    let owner;
    let user;
    /**
     * This before each will run before each test within this describe.
     */
    beforeEach(async () => {
      // Getting the signers provided by ethers
      const signers = await ethers.getSigners();
      // Using the first one as the owner
      owner = signers[0];
      user = signers[1];
      // Getting the token code (abi, bytecode, name)
      const Token = await ethers.getContractFactory("Token");
      // Deploying the token contract
      hardHatToken = await Token.deploy();
    });
    /**
     * The below tests go through all the `waffle` testing tools available within
     * the hardHat framework
     */
    it("Getting signers", async function() {
      // Getting the signers provided by ethers
      const signersCheck = await ethers.getSigners();
      // Using the first one as the owner
      let ownerCheck = signersCheck[0];
      // Using the second one as a user
      let userCheck = signersCheck[1];
      // To get the address of the signer
      // console.log(owner.address);

      // Testing that the address is as expected (with error message)
      expect(ownerCheck.address).to.equal(
        signersCheck[0].address, 
        "signer 0 address mismatch"
      );
      // Testing that the address is as expected (without an error message)
      expect(userCheck.address).to.equal(signersCheck[1].address);
    });
    /**
     * This test is formatted a little weirdly to allow for comments to explain
     * what is going on
     */
    it("Event test", async function() {
      // Checking that the transfer emits the expected event
      await expect(
        // the actual transfer function call
        hardHatToken.transfer(user.address, 7)
        // checking the event name 
      ).to.emit(hardHatToken, 'transferEvent')
      // Checking the event emits the expected values
      .withArgs(owner.address, user.address, 7);
    });
    /**
     * Tests that a contract call reverts (again, formatted weirdly for comments)
     */
    it("Revert call test", async function() {
      // Normal expect
      await expect(
        // Connecting the user wallet to the token contract
        hardHatToken.connect(user)
          // The contract call being called (transfer)
          .transfer(owner.address, 1007)
          // Specifying that it is expected to be reverted
      ).to.be.reverted;
    });
    /**
     * Tests that a contract call reverts (again, formatted weirdly for comments)
     */
    it("Revert call (with error message) test", async function() {
      // Normal expect
      await expect(
        // Connecting the user wallet to the token contract
        hardHatToken.connect(user)
          // The contract call being called (transfer)
          .transfer(owner.address, 1007)
          // Specifying the error messaged expected with revert
      ).to.be.revertedWith("Not enough tokens");
    });
    /**
     * Tests that a user can send ETH and that the ETH balance changes as expected.
     * Ignores gas fees by default
     * @notice  If there is more than one transaction mined in the same block
     *          `changeEtherBalance` will not work
     */
    it("Sending ETH test", async function() {
      // Normal expect
      await expect(
        // Calling sendTransaction on the signer allows the sending of ETH directly
        await owner.sendTransaction(
          {to: user.address, value: 200}
        )
        // Checking that the ETH balance changes as expected (accounts for gas)
      ).to.changeEtherBalance(
        // The signer to check
        user, 
        // The amount
        200
      );
    });
    /**
     * Tests that a contract call reverts (again, formatted weirdly for comments)
     * @notice  If there is more than one transaction mined in the same block
     *          `changeEtherBalance` will not work
     */
    it("Sending ETH (gas included) test", async function() {
    // Normal expect
    await expect(
      // Sending ETH
      await owner.sendTransaction(
        // Specifying the gas price (for consistency)
        {to: user.address, gasPrice: 1, value: 200}
      )
      // Notice the included fee switch, which will include the fees in the 
      // changed balance calculations
    ).to.changeEtherBalance(
      // The signer to check
      owner, 
      // The amount
      -21200, 
      // Switches (to include fees)
      {includeFee: true}
    );
  });
  });
  /**
   * Tests that came with the hard Hat tut
   */
  describe("Tests from HardHat tut", async function() {
    beforeEach(async function () {
      // Get the ContractFactory and Signers here.
      Token = await ethers.getContractFactory("Token");
      [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
  
      // To deploy our contract, we just have to call Token.deploy() and await
      // for it to be deployed(), which happens onces its transaction has been
      // mined.
      hardhatToken = await Token.deploy();
    });
  
    // You can nest describe calls to create subsections.
    describe("Deployment", function () {
      // `it` is another Mocha function. This is the one you use to define your
      // tests. It receives the test name, and a callback function.
  
      // If the callback function is async, Mocha will `await` it.
      it("Should set the right owner", async function () {
        // Expect receives a value, and wraps it in an assertion objet. These
        // objects have a lot of utility methods to assert values.
  
        // This test expects the owner variable stored in the contract to be equal
        // to our Signer's owner.
        expect(await hardhatToken.owner()).to.equal(owner.address);
      });
  
      it("Should assign the total supply of tokens to the owner", async function () {
        const ownerBalance = await hardhatToken.balanceOf(owner.address);
        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
      });
    });
  
    describe("Transactions", function () {
      it("Should transfer tokens between accounts", async function () {
        // Transfer 50 tokens from owner to addr1
        await hardhatToken.transfer(addr1.address, 50);
        const addr1Balance = await hardhatToken.balanceOf(addr1.address);
        expect(addr1Balance).to.equal(50);
  
        // Transfer 50 tokens from addr1 to addr2
        // We use .connect(signer) to send a transaction from another account
        await hardhatToken.connect(addr1).transfer(addr2.address, 50);
        const addr2Balance = await hardhatToken.balanceOf(addr2.address);
        expect(addr2Balance).to.equal(50);
      });
  
      it("Should fail if sender doesn’t have enough tokens", async function () {
        const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
  
        // Try to send 1 token from addr1 (0 tokens) to owner (1000 tokens).
        // `require` will evaluate false and revert the transaction.
        await expect(
          hardhatToken.connect(addr1).transfer(owner.address, 1)
        ).to.be.revertedWith("Not enough tokens");
  
        // Owner balance shouldn't have changed.
        expect(await hardhatToken.balanceOf(owner.address)).to.equal(
          initialOwnerBalance
        );
      });
  
      it("Should update balances after transfers", async function () {
        const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
  
        // Transfer 100 tokens from owner to addr1.
        await hardhatToken.transfer(addr1.address, 100);
  
        // Transfer another 50 tokens from owner to addr2.
        await hardhatToken.transfer(addr2.address, 50);
  
        // Check balances.
        const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);
        expect(finalOwnerBalance).to.equal(initialOwnerBalance - 150);
  
        const addr1Balance = await hardhatToken.balanceOf(addr1.address);
        expect(addr1Balance).to.equal(100);
  
        const addr2Balance = await hardhatToken.balanceOf(addr2.address);
        expect(addr2Balance).to.equal(50);
      });
    });
  });
});