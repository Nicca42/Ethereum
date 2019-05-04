import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
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
