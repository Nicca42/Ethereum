# Vyper Cheatsheet

### Index:
##### [What is Vyper?](#what-is-vyper)
##### [Contract Set up](#contract-set-up)
* [Variable Data Types](#variable-data-types)
* [Declaring a function](#declaring-a-function)
   * [Constructor](#constructor)
   * [Default functions](#default-functions)
* [Events](#events)
* [Comments & documentation](#comments-and-documentation)
* [External Contract Interactions](#external-contract-interactions)
   * [Interfaces](#interfaces)
   * [Importing and implementing external contracts](#importing-and-implementing-external-contracts)
##### [Resources](#resources)

## What is Vyper
A pythonic programming language that targets the EVM.
Vyper was created with specific goals and principals in mind that heavily affect functionality. These are:
**Auditability** - NB This is Vyper's biggest focus - human readability. This means making it as hard as possible to write misleading code. 
**Security** - It should be natural to build secure smart contracts. 
**Language** - The language should be simple (so that non-developers could understand contract code). So as human-readable as possible.

##### The goal of human readability has lead to some useful (and some frustrating) features: 
* Arithmetic level bounds and overflow checking
* Support for signed integers
* Decimal fixed-point numbers
* Decidability (precise computations for the upper bound of gas consumption).
* Strong typing
* Limited support for pure functions
* Small and understandable compiler code

##### Because of the need to be simple and not misleading in any way, the following functionality has been removed:
* Modifiers
* Inheritance
* Inline assembly
* Function overloading
* Operator overloading
* Recursive calling
* Infinite-length loops
* Binary fixed point (decimal are used instead)

## Contract Set Up
The file extension type is `.vy`

Whatever version of vyper you have installed is the version of vyper the compiler will use. You do not get to specify the version explicitly. 

As Vyper is pythonic, the tabbing of code is vital. Please note, that the code inside a contract does not need to be one tab in. I.e:
```
# Declaring the contract 
contract ContractName:

# The code is against the margin, and is not a tab in.
Transfer: event({_from: indexed(address), _to: indexed(address), _tokenId: indexed(uint256)})

# The event does not need to be a tab in, like below.
    Transfer: event({_from: indexed(address), _to: indexed(address), _tokenId: indexed(uint256)})

# The code within this contract is against the margin, the code withing each function is then tabbed
@public
@constant
def aFuction(_tokenId: uint256) -> bool:
    return self.exists[_tokenId]
```

### Variable Data Types
Declaring a variable:
```
# variableName: <variable data type> i.e: 
storedNumber: uint128
```

In order to reference a variable of the contracts, the keyword `self` must be used. I.e

In order to reference a variable within the contract, you must use the keyword `self`, i.e `self._variableName`.

| Variable type | Description | Members |
|:-------------:|:-----------:|:-------:|
| `self` | The contract | `balance` The balance of the contract <br> To reference any variable within the contract, (internal or external) the `self` keyword must be used i.e `self.isLocked` |
| `bool` | Boolean | ~ |
| `int128` | Signed int (positive and negative numbers) | ~ |
| `uint256` | Unsigned int (only positive) | ~ | 
| `decimal` | decimals (is signed, 10 decimal places) | ~ |
| `address` | Ethereum address | `balance`: Balance (returned in `wei_value`) <br> `codesize`: Size of address (returns `int128`) <br> `is_contract`: If the address is a contract |
| `timestamp` | time stamps (`uint256` measured in seconds) | | 
| `timedelta` | time since/change (`uint256` in seconds) | **NOTE** `timedelta`s can be added together, and can be added to `timestamps`, but two `timestamps` cannot be added together. | 
| `wei_value` | Wei (`uint256`) | ~ | 
| `bytes32` | Byte 32 array | `sha3` hash: `sha3( <bytes32> )` <br> concatenation: `concat( <bytes32>, ... )` <br> slicing: `slice( <bytes32, start=_start, len=_len )` returns a slice of the specified length (`_len`) starting at `_start` |
| `bytes[maxLength]` | Fixed-sized byte array i.e `bytes[100]`, the size is fixed and cannot be unspecified | ~ | 
| `string[maxLength]` | Fixed-size strings:  i.e `string[100]` | `len( <string> )` length <br> `sha3` hash: `sha3( <string> )` <br> concatenation: `concat( <string>, ... )` <br> slicing: `slice( <string>, start=_start, len=_len)` (same as `bytes32` slicing) |
| `_name: VariableType[_size]` | Fixed-sized lists i.e `_balances: uint256[100]` (multidimensional lists are supported i.e `_allowances: uint256[100][100]`) | ~ |
| `struct StructName:` | `struct StructName: `<br>` value1: int128 `<br>` value2: string[100]`<br>`#Constructing:`<br>`exampleStruct = MyStruct({value1: 123, value2: "string"})`<br>`#Getting data out`<br>`exampleStruct.value1 = 1` | **NOTE** as this is a pythonic language, tabbing is important. The variables within the struct should be tabbed | 
| Custom Units | `units: {`<br>`cm: "centimeter"`<br>`}`<br> To use it: `a: int128(cm)` | ~ |

### Declaring a function
Much like Solidity there are decorator tags used to indicate if the function is public/private or payable. There are 5 decorators.

1. `@public`: Marks the function as public. This function can only be called by an external contract. 
2. `@private`: Marks the function as private. This function can only be called within this contract.
3. `@constant` This function does not alter contract state. The same as a `view` function in Solidity.
4. `@payable` This function can receive ether. 
5. `@nonrentant(<unique_key>)`: This function can only called once, internally or externally. Used to prevent reentrancy attacks.

Function structure:
```
# Comments
@public
@payable 
def functionName():
    <functionality>
```

##### Constructor

To declare the constructor in Vyper we make a function called `__init__`. A double underscore on both sides. 
```
# A basic constructor that sets the address of the owner. 
@public
def __init__(_owner: address):
    self.ownerAddress = _owner
```

##### Default functions
Vyper can have a default function, which is executed on a call to the contract that does not match any functions. Vyper (like Solidity) will generate a default function if it cannot find one, that will automatically revert. This reverting generates an exception, meaning no funds will accidentally be received. 
```
Payment: event({amount: int128, from: indexed(address)})

# This is a default function that logs (emits an event) any value sent to the contract
@public
@payable
def __default__():
    log.Payment(msg.value, msg.sender)
```

### Events
An event is declared like so:
```
Transfer: event({amount: uint128, sender: indexed(address), receiver: indexed(address)})
```
To emit an event, you `log` it i.e:
```
log.Payment(msg.value, msg.sender, _to)
```

### Comments and Documentation
Documents are denoted with 3 double quotes starting and ending the comments `"""`. These comments go inside the function or under the event. These comments are [NatSpec Metadata](https://github.com/ethereum/wiki/wiki/Contract-Metadata-Docs-(NatSpec,-ABI)). The documentation has tags, these tags are:
```
"""
@author: The author of the contract/function
@notice: Non technical description of function
@dev: Technical description of function
@param: The parameters of the function
@return: What the function returns
"""
```
You can make these comments above the functions/events using the normal `#` comments, but they will then not be [NatSpec Metadata](https://github.com/ethereum/wiki/wiki/Contract-Metadata-Docs-(NatSpec,-ABI)) compatible. 

```
# A normal comment 
```

### External Contract Interactions
Vyper allows for interactions with external contracts, such as interfaces, importing other contracts and calling functions on external contracts. 

##### Interfaces
Vyper has a built-in format option for creating an interface

```
# Use this command to extract the contracts output, which can be copy pasted into your contract to interact with the external contract. 
vyper -f external_interface examples/voting/ballot.vy

# External contracts output 
contract Ballot:
    def delegated(addr: address) -> bool: constant
    def directlyVoted(addr: address) -> bool: constant
    def giveRightToVote(voter: address): modifying
    def forwardWeight(delegate_with_weight_to_forward: address): modifying
```

##### Importing and implementing external contracts

There are built in interfaces that you can get from `vyper.interfaces`, such as `ERC20` and `ERC721`.
```
# Importing from the available vyper interfaces
from vyper.interfaces import ERC20

# This allows your contract to implement the interface 
implements: ERC20
```

Implementing the contract means you will have to implement all abstract functions of that interface. 

To make an instance of this contract within your contract:
```
# The interface of the contract cast to an address, followed by .function call ()
ContractInterface(address).function()
# i.e
Ballot(addressOfBallotContract).giveRightToVote(_address)

# To make a variable to store a contract instance at:
some_contract: Ballot

# Inside a function or the constructor
self.some_contract = Ballot(addressOfContract)
```

# Resources
[Vyper data types - Vyper read the docs](https://vyper.readthedocs.io/en/latest/types.html#types)
[Vyper contract structure - Vyper read the docs](https://vyper.readthedocs.io/en/latest/structure-of-a-contract.html)
[Getting started with Vyper - Medium article](https://medium.com/@rossbulat/get-started-with-vyper-the-pythonic-ethereum-smart-contract-language-e5e58969087e)
[Learn Vyper from your browser - Medium article](https://medium.com/coinmonks/learn-the-ethereum-language-vyper-from-within-your-browser-b084ec51302)
[Vyper by example - Vyper read the docs](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
[Vyper documentation - Vitalik Buterin](https://buildmedia.readthedocs.org/media/pdf/vyper/latest/vyper.pdf)
[Vyper - github](https://github.com/ethereum/vyper)
