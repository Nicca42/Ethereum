import React from 'react';
import './App.css';
import web3 from 'web3';

function App() {
    let state = {
        web3Provider: null,
        contracts: {},
    }

    let initWeb3 = async () => {
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
              await window.ethereum.enable();
            } catch (error) {
              console.error("User denied account access")
            }
          } else if (window.web3) {
            state.web3Provider = window.web3.currentProvider;
          }
          else {
            state.web3Provider = new web3.providers.HttpProvider('http://localhost:7545');
          }
          web3 = new web3(state.web3Provider);
          return App.initContract(window.web3.eth.accounts[0]);
    }

    let initContract = (account) => {
        // var SimpleBankArtifact = data;
        // App.contracts.SimpleBank = TruffleContract(SimpleBankArtifact);
        // App.contracts.SimpleBank.setProvider(App.web3Provider);
        // return App.getBalance(account);
    }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Simple Bank with ENS!</h1>
        <p>Your balance: 0</p>
        <table>
          <row>
          <p>Mint free tokens:</p>
          <button className="actions">Mint</button>
          </row>
        </table>
        
        <p>Burn free tokens!</p>
        <button>Burn</button>
      </header>
    </div>
  );
}

export default App;
