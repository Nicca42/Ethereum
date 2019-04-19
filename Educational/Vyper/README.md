# Vyper Cheatsheet

## Vyper is…
A pythonic programming language that targets the EVM. Docs.
Vyper is written with specific goals and principals that heavily affect functionality. These are:
**Security** - It should be natural to build secure smart contracts. 
**Language** - The language should be simple.
**Auditability** - NB This is Vypers most strived for goal, human readability. This means making it as hard as possible to write misleading code. The goal of human readability has lead to some useful (and some frustrating) features: 
* Arithmetic level bounds and overflow checking
* Support for signed integers
* Decimal fixed-point numbers
* Decidability (precise computations for the upper bound of gas consumption).
* Strong typing
* Limited support for pure functions
* Small and understandable compiler code

Because of the above, some functionality has been removed:
1. Modifiers
2. Inheritance
3. Inline assembly
4. Function overloading
5. Operator overloading
6. Recursive calling
7. Infinite-length loops
8. Binary fixed point (decimal are used instead)

## Contract Cheatsheet
Declaring the compiler
`pyethereum>=2.0.0`
Declaring a vyper contract:

### Variable data types:
Declaring a variable:
`variable name: variable data type`
i.e `storedNumber: uint128`

| Variable type | Description | Members |
|:-------------:|:-----------:|:-------:|
| `bool` | Boolean | |
| `int128` | Signed int (positive and negative numbers) | |
| `uint256` | Unsigned int (only positive) | | 
| `decimal` | decimals (is signed, 10 decimal places) | |
| `address` | Ethereum address | `balance`: Balance (returned in `wei_value`) <br> `codesize`: Size of address (returns `int128`) <br> `is_contract`: If the address is a contract |
| `timestamp` | time stamps (`uint256` measured in seconds) | | 
| `timedelta` | time since/change (`uint256` in seconds) | **NOTE** `timedelta`s can be added together, and can be added to `timestamps`, but two `timestamps` cannot be added together. | 
| `wei_value` | Wei (`uint256`) | | 
| `bytes32` | Byte 32 array | `sha3` hash: `sha3( <bytes32> )` <br> concatenation: `concat( <bytes32>, ... )` <br> slicing: `slice( <bytes32, start=_start, len=_len )` returns a slice of the specified length (`_len`) starting at `_start` |
| `bytes[maxLength]` | Fixed-sized byte array i.e `bytes[100]`, the size is fixed and cannot be unspecified | | 
| `string[maxLength]` | Fixed-size strings:  i.e `string[100]` | `len( <string> )` length <br> `sha3` hash: `sha3( <string> )` <br> concatenation: `concat( <string>, ... )` <br> slicing: `slice( <string>, start=_start, len=_len)` (same as `bytes32` slicing) |
| `_name: VariableType[_size]` | Fixed-sized lists i.e `_balances: uint256[100]` (multidimensional lists are supported i.e `_allowances: uint256[100][100]`) | |
| `struct StructName:` | `struct StructName: `<br>` value1: int128 `<br>` value2: string[100]`<br>`#Constructing:`<br>`exampleStruct = MyStruct({value1: 123, value2: "string"})`<br>`#Getting data out`<br>`exampleStruct.value1 = 1` | **NOTE** as this is a pythonic language, tabbing is important. The variables within the struct should be tabbed | 
| Custom Units | `units: {`<br>`cm: "centimeter"`<br>`}`<br> To use it: `a: int128(cm)` | |

###Declaring a function
Much like Solidity there are tags used to indicate if the function is public/private or payable. These tags are called decorators, and there are 5.

1. `@public`: Marks the function as public. This function can only be called by an external contract. 
2. `@private`: Marks the function as private. This function can only be called within this contract.
3. `@constant` This function does not alter contract state.
4. `@payable` This function can receive ether. 
5. `@nonrentant(<unique_key>)`: This function can only called once, internally or externally. Used to prevent reentrancy attacks.

Function structure:
```
@public
@payable
def functionName():
    <functionality>
```

Default functions
Vyper can have a default function, which is executed on a call to the contract that does not match any functions. The 


###Events
An event is declared like so:
`Transfer: event({})

# Resources
https://vyper.readthedocs.io/en/latest/types.html#types
https://vyper.readthedocs.io/en/latest/structure-of-a-contract.html
https://medium.com/@rossbulat/get-started-with-vyper-the-pythonic-ethereum-smart-contract-language-e5e58969087e
https://medium.com/coinmonks/learn-the-ethereum-language-vyper-from-within-your-browser-b084ec51302
https://vyper.readthedocs.io/en/latest/vyper-by-example.html
https://www.google.com/search?q=vyper+docs&oq=vyper+docs&aqs=chrome..69i57j0.2088j0j7&sourceid=chrome&ie=UTF-8
https://www.google.com/search?q=vyper+ethereum&oq=vyper+ethereum&aqs=chrome..69i57j0l4.6262j0j7&sourceid=chrome&ie=UTF-8