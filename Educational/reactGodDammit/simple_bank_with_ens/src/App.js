import React from 'react';
import logo from './logo.svg';
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
            App.web3Provider = window.web3.currentProvider;
          }
          else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
          }
          web3 = new Web3(App.web3Provider);
          return App.initContract(window.web3.eth.accounts[0]);
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
