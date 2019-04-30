# Simple Bank With ENS

Based off of Truffles [pet-shop truffle box](https://truffleframework.com/boxes/pet-shop), this very, _very_ simple dApp is used as the base for experimenting with other tools. 

This is version `1.0.0`. Its ugly, but it works as it needs to. 

## ENS

ENS allows users to have a "name" (domain/subdomain) that can be used in place of an address. This name gets translated to the wallets address (through a library), and or other data you want to associate with the username.

### Libraries

The following is a table of available libraries with some degree of ENS functionality integrated. 

| Library | Name Resolution | Transferring ownership | Creating subdomains | Updating address | Updating other records | Configuring reverse resolution | 
|:-------:|:---------------:|:----------------------:|:-------------------:|:---------:|:---------------------:|:------------------------------:|
| `ethereum-ens` | Yes | Yes | Yes | Yes | Yes | X |
| `web3.js` | X | X | X | Yes | Yes | X |
| `ethjs-ens` |  |  |  |  |  |  |
| `ethers.js` | Yes | X | X | X | X | X |
| `web3j` | Yes | X | X| X | X | X |
| `web3.py` | Yes | Yes | Yes | Yes | X | Yes |

Here we will use `ethereum-ens` as it has the most functionality (resolving, creating subdomains etc).
To add `ethereum-ens` to your project you will need to add it:
`npm i ethereum-ens`
