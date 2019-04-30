App = {
  web3Provider: null,
  contracts: {},
  ens,
  ENS,
  //Above we are making a global ens variable

  init: async function() {
    return await App.initWeb3();
  },

  initWeb3: async function() {
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      App.ENS = require('ethereum-ens');
      //Here we inicialize our ens. This will only run once. Its an if else. 
      App.ens = new ENS(App.web3Provider);
      try {
        await window.ethereum.enable();
      } catch (error) {
        console.error("User denied account access")
      }
    } else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
      //Here we inicialize our ens
      App.ens = new ENS(App.web3Provider);
    }
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      //Here we inicialize our ens
      App.ens = new ENS(App.web3Provider);
    }
    web3 = new Web3(App.web3Provider);
    return App.initContract(window.web3.eth.accounts[0]);
  },

  initContract: function(account) {
    $.getJSON('SimpleBank.json', function(data) {
      var SimpleBankArtifact = data;
      App.contracts.SimpleBank = TruffleContract(SimpleBankArtifact);
      App.contracts.SimpleBank.setProvider(App.web3Provider);
      return App.getBalance(account);
    });
    return App.bindEvents();
  },
  bindEvents: function() {
    $(document).on('click', '.btn-mintToken', App.handleMint);
    $(document).on('click', '.btn-burnToken', App.handleBurn);
  },

  getBalance: function(account) {
    var simpleBankInstance;
    App.contracts.SimpleBank.deployed().then(function(instance) {
      simpleBankInstance = instance;
      let balance = simpleBankInstance.balanceOf.call(account, {from: account}).then(function(balance) {
        $('.txt-balance').text(balance.toString());
        console.log("Balance updated:" + balance.toString());
        return balance.toString();
      })
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  getEnsName: function(account) {
    App.ens.reverse(account).name().the(function(name) {
      console.log(name)
    })
  },

  handleMint: function(event) {
    var simpleBankInstance;
    var amount;
    try {
      let temp = document.getElementById("txt-input").value;
      amount = parseInt(temp);
      if(amount > 0) {
        web3.eth.getAccounts(function(error, accounts) {
          if (error) {
            console.log(error);
          }
          var account = accounts[0];
          App.contracts.SimpleBank.deployed().then(function(instance) {
            simpleBankInstance = instance;
            simpleBankInstance.mint(amount, {from: account});
            console.log("Successfully minted tokens")
          }).then(function() {
            let userAddress = window.web3.eth.accounts[0]
            return App.getBalance(userAddress);
          }).catch(function(err) {
            console.log(err.message);
          });
        });
      }
    } catch (err) {      
      console.log(err);
    }
  },

  handleBurn: function(event) {
    var simpleBankInstance;
    var amount;
    var userAddress = window.web3.eth.accounts[0];
    try {
      let temp = document.getElementById("txt-input").value;
      amount = parseInt(temp);
      if(amount > 0) {
        web3.eth.getAccounts(function(error, accounts) {
          if (error) {
            console.log(error);
          }
          var account = accounts[0];
          App.contracts.SimpleBank.deployed().then(function(instance) {
            simpleBankInstance = instance;
            simpleBankInstance.burn(amount, {from: account});
            console.log("Successfully burned tokens");
          }).then(function() {
            return App.getBalance(userAddress);
          }).catch(function(err) {
            console.log(err.message);
          });
        });
      }
    } catch (err) {      
      console.log(err);
    }
  },

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
