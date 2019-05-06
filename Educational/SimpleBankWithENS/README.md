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

| Library (linked to npm) | Name Resolution (forward + reverse) | Transferring ownership | Creating subdomains | Updating address | Updating other records | Configuring reverse resolution (`.claim()`) | 
|:-------:|:---------------:|:----------------------:|:-------------------:|:---------:|:---------------------:|:------------------------------:|
| [`ethereum-ens`](https://www.npmjs.com/package/ethereum-ens) | Yes | Yes | Yes | Yes | Yes | X |
| [`web3.js` & `web3j`](https://www.npmjs.com/package/web3) | Yes | Yes | Yes | Yes | Yes | X |
| [`ethjs-ens`](https://www.npmjs.com/package/ethjs-ens) | Yes | X | X | X | X | X |
| [`ethers.js`](https://www.npmjs.com/package/ethers) | Yes ~ | X | X | X | X | X |
| [`web3j`](https://web3j.readthedocs.io/en/stable/ens.html) | Yes | X | X| X | X | X |
| [`web3.py`](https://www.npmjs.com/package/web3) | Yes | Yes | Yes | Yes | X | Yes |

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

## `ethereum-ens` functionality with examples

To see these in action head over to the [app.js](./src/js/app.js)! There are alot of functions here so I did try use all of them, even if their use was extraneous. 
**Note** These calls are all asynchronous. Therefore you must either use `await` or `.then()`. 

Gets the address of a name
* `.resolver( <name>, <abi (optional)> )`
    * **Params:** The name to resolve (as `<name>`). If the `<abi>` is not supplied a default definition is used implementing `has`, `addr`, `name`, `setName`, and `setAddr`. 
    * **Returns:** The address of the name, as a Bluebird promise. 
    * **Throws:** `ENS.NameNotFound` if the name does not exist.
    * **Example:** `var address = await ens.resolver('vee.mydapp.eth').addr();`
        * Resolving other data is the same process but instead of `.addr()` it would be the data type. For example: `var userData = await ens.resolver('vee.mydapp.eth').text();`

Gets the name of an address
* `.reverse( <address>, <abi (optional)> )`
    * **Params:** Address (as `<address>`) to look up.  If the `<abi>` is not supplied a default definition is used implementing `has`, `addr`, `name`, `setName`, and `setAddr`. 
    * **Returns:** The name of the address, as a Bluebird promise. 
    * **Throws:** `ENS.NameNotFound` if the reverse record does not exist.
    * **Example:** `var name = await ens.reverse(address).name();`
        * Don't forget to check your reverse resolve. `if(address != await ens.resolver(name).addr()) { ... handle incorrect name ... }`
        * **NB YOU CANNOT REVERSE LOOK UP A NAME UNLESS THAT NAME HAS BEEN CLAIMED.** To claim a name a name you must call the `claim()` function on the reverse resolver found at the `addr.reverse` name. TODO a clear example of this??? Otherwise you can go to the [ENS Manager DApp](https://manager.ens.domains/).
        
Sets the resolvers address (so you can resolve & reverse resolve "names" (domains/subdomains))
* `.setResolver( <name>, <address>, <options (optional)> )`
    * **Params:** The name (as `<name>`) of the domain, the `<address>` of the resolver. The `<options>` can be a dict of parameters to pass to web3 but are optional. Only the owner can call this functionality. 
    * **Returns:** The transaction ID as a promise.
    * **Throws:** Will throw if you are not the owner of the root domain. 
    * **Example:** `await ens.setResolver(name, address, {from: owner});`
        * There are public resolvers on mainnet and Kovan. To get the address of these resolvers simply call the resolver on the specially named domain `resolver.eth` like so: `var resolver = await ens.resolver('resolver.eth').addr();` This will return the address of the latest resolver. You can also find and or deploy a resolver on the other test nets. 

Gets the address of the owner of the ENS name.
* `.owner( <name>, <callback> )`
    * **Params:** The `<name>` of the domain. 
    * **Returns:** The address of the owner.
    * **Throws:** ?? Probably `ENS.NameNotFound`.
    * **Example:** `var owner = await ens.owner(name);`

Sets the owner of the name
* `.setOwner( <name>, <address>, <options (optional)> )`
    * **Params:** The `<name>` of the domain/subdomain, and the `<address>` of the owner. The `<options>` can be a dict of parameters to pass to web3 but are optional. Only the owner can call this functionality. 
    * **Returns:** Probably the transaction ID if anything. TODO
    * **Throws:** Will throw if you are not the owner of the root domain. 
    * **Example:** `await ens.setOwner(name, address, {from: owner});`
        * **Note** That this is for transferring the ownership of a domain, not a subdomain. Once the ownership has been transferred you will have no ability to create subdomains, renew the domain or any other owner functionality. 

Sets the owner of the subdomain
* `.setSubnodeOwner( <name>, <address>, <options (optional)> )`
    * **Params:** The `<name>` of the subdomain (i.e vee.mydapp.eth) NOT a domain (i.e mydapp.eth), and the `<address>` of the new owner. **Note** This is also how you CREATE new subdomains. Only the owner of the root domain (in this case the owner of mydapp.eth) can create and change the owner of subdomains. The `<options>` can be a dict of parameters to pass to web3 but are optional. Only the owner can call this functionality. 
    * **Returns:** Probably the transaction ID if anything. TODO
    * **Throws:** Will throw if you are not the owner of the root domain. 
    * **Example:** `await ens.setSubnodeOwner(name, address, {from: owner});`

Update the address of a name
* `setAddr( <address> )`
    * **Params:** The new `<address>` of the subdomain. **Note** This function needs to be called on the resolver. See the example. Only the owner can call this functionality. 
    * **Returns:** Probably the transaction ID if anything. TODO
    * **Throws:** Will throw if you are not the owner of the root domain. 
    * **Example:** `ens.resolver(name).setAddr(newAddress, {from: owner});`
        * This is also how you update other associated data types. E.g: `ens.resolver(name).setText('the new', 'text', {from: owner});`

# Resources used to pull this all together:

`create-react-app` -
[This guide](https://medium.com/coinmonks/building-ethereum-dapps-with-reactjs-truffle-contract-web3-a-ui-for-tokenzendr-a-smart-bf345478b116) - A guide to making the standard `react-app` web3 enabled. 
