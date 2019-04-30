# Simple Bank With ENS

Based off of Truffles [pet-shop truffle box](https://truffleframework.com/boxes/pet-shop), this very, _very_ simple dApp is used as the base for experimenting with other tools. 

This is version `1.0.0`. Its ugly, but it works as it needs to. 

## ENS

ENS allows users to have a "name" (domain/subdomain) that can be used in place of an address. This name gets translated to the wallets address (through a library), and or other data you want to associate with the username.
For a quick explanation check out [this YouTube video]().
For a step by step guide of getting a name, check [this for testnets]() and [this for the mainnet]().

**Note** The words name, domain and subdomain are used interchangeably. 

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

## Setting up ENS

Within this project we will use `ethereum-ens` as it has the most functionality (resolving, creating subdomains etc). For functionality information check out the [ethereum-ens npm package](https://www.npmjs.com/package/ethereum-ens/v/0.7.7)
To add `ethereum-ens` to your project you will need to install it:
`npm i ethereum-ens`

**Note** This library uses python. If you are on windows and you don't have python... good luck.

Once you have the library installed, head over to your [app.js/where you get your injected web3/window/whatever](./src/js/app.js). We will need to create an instance of `ethereum-ens`:
`var ENS = require('ethereum-ens');`
Then to initialize our instance we need to give ENS the ethereum provider (that you got from the window, or web3):
`var ens = new ENS(provider);`
Now we have an instance of ENS that we can use!

## Using ENS

With `ethereum-ens` you can:

Gets the address of a name
* `.resolver( <name>, <abi (optional)> )`
    * **Params:** The name to resolve (as `<name>`). If the `<abi>` is not supplied a default definition is used implementing `has`, `addr`, `name`, `setName`, and `setAddr`. 
    * **Returns:** The address of the name, as a Bluebird promise. 
    * **Throws:** `ENS.NameNotFound` if the name does not exist.

Gets the name of an address
* `.reverse( <address>, <abi (optional)> )`
    * **Params:** Address (as `<address>`) to look up.  If the `<abi>` is not supplied a default definition is used implementing `has`, `addr`, `name`, `setName`, and `setAddr`. 
    * **Returns:** The name of the address, as a Bluebird promise. 
    * **Throws:** `ENS.NameNotFound` if the reverse record does not exist.

Sets the resolvers address (so you can resolve & reverse resolve "names" (domains/subdomains))
* `.setResolver( <name>, <address>, <options (optional)>, <addr>, <params> )`
    * **Params:** The name (as `<name>`) of the domain, the `<address>` of the resolver. The `<options>` can be a dict of parameters to pass to web3 but are optional. Only the owner can call this functionality. 
    * **Returns:** The transaction ID as a promise.
    * **Throws:** ??

Gets the address of the owner of the ENS name.
* `.owner( <name>, <callback> )`
    * **Params:** The `<name>` of the domain. 
    * **Returns:** The address of the owner.
    * **Throws:** ?? Probably `ENS.NameNotFound`.

Sets the owner of the name
* `.setOwner(  )`: sets the owner of the specific name. Only the owner can call this. 
    * **Params:**
    * **Returns:**
    * **Throws:**

* `.setSubnodeOwner`: Sets the owner of a subdomain. Only the owner of the parent name can call this.
    * **Params:**
    * **Returns:**
    * **Throws:**