const etherlime = require('etherlime-lib');
const ethers = require('ethers');

const batchApproveJson = require('../build/BatchApprove.json');
const tokenJson = require('../build/Token.json');

describe('Batch Approves', () => {
    let deployerAccount = accounts[0];
    let eoaWallet = accounts[1];

    let deployer;
    let batchApprove;
    let tokenOne, tokenTwo, tokenThree;

    before(async () => {
        // setting up the deployer
        deployer = new etherlime.EtherlimeGanacheDeployer(
            deployerAccount.secretKey
        );
        // creating an instance of the batch approver
        batchApprove = await deployer.deploy(
            batchApproveJson,
            false
        );
        // creating 3 ERC20 tokens
        tokenOne = await deployer.deploy(
            tokenJson,
            false,
            "Token One",
            "T1"
        );
        tokenTwo = await deployer.deploy(
            tokenJson,
            false,
            "Token Two",
            "T2"
        );
        tokenThree = await deployer.deploy(
            tokenJson,
            false,
            "Token Three",
            "T3"
        );
    });

    it('can approve one token', async () => {
        await batchApprove.from(eoaWallet).oneTokenApprove(
            tokenOne.contract.address,
            ethers.utils.parseUnits("10", 18)
        );

        let batchApproveBalance = await tokenOne.allowance(
            eoaWallet.signer.address,
            batchApprove.contract.address
        );

        let batchApproveBalance2 = await tokenOne.allowance(
            batchApprove.contract.address,
            batchApprove.contract.address
        );

        console.log(batchApproveBalance.toString());
        console.log(batchApproveBalance2.toString());
    });

});