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

var AnotherContractName = artifacts.require("./AnotherContractName.sol");

contract("contractName tests", function(accounts) {
    const DeployAddress = accounts[0];
    const acc1 = accounts[1];
    const acc2 = accounts[2];
    const acc3 = accounts[3];
    const acc4 = accounts[4];

    let AnotherContractInstance;

    beforeEach("", async () => {
        AnotherContractInstance = await AnotherContractName.new({from: DeployAddress});
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