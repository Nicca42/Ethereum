const {
    ether
} = require('./helpers/ether');
const {
    expectThrow
} = require('./helpers/expectThrow');
const {
    EVMRevert
} = require('./helpers/EVMRevert');
const { 
    assertRevert 
} = require('./helpers/assertRevert');

var ContractName = artifacts.require("./ContractName.sol");

contract("contractName tests", function(accounts) {
    const DeployAddress = accounts[0];
    const acc1 = accounts[1];
    const acc2 = accounts[2];
    const acc3 = accounts[3];
    const acc4 = accounts[4];

    let ContractInstance;

    beforeEach("", async () => {
        ContractInstance = await ContractName.new("Constructor argument", {from: DeployAddress});

        let contractName = await ContractInstance.name();
        assert.equal(contractName, "Constructor argument", "Name is correct");
        assert.notEqual(contractName, "Not constructor argument", "Name is correct");
        await assertRevert(ContractInstance.accessRestricted("Fake new name", {from: acc1}) , EVMRevert);
    });

    describe("Basic functionality", () => {
        it("", async () => {

        });

        it("", async () => {

        });

        it("", async () => {

        });

        it("", async () => {

        });

        it("", async () => {

        });
    });

    describe("", () => {
        it("", async () => {

        });

        it("", async () => {

        });

        it("", async () => {

        });

        it("", async () => {

        });
    });
});