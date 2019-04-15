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
`storedNumber: uint128`
* Type: `keyword`
* Boolean: `bool`
* Signed int: `int128` (positive and negative numbers)
* Unsigned int: `uint256` (only positive)
* decimals: `decimal` (is signed, 10 decimal places)
* Ethereum address: `address`
    * Members listed below are used by calling them on an address, i.e `address.balance`.
    * Balance: `balance` (returned in `wei_value`)
    * Size of address: `codesize` (returns `int128`) 
    * If its a contract: `is_contract`
* time stamps: `timestamp` (`uint256` measured in seconds)
* time since/change: `timedelta` (`uint256` in seconds)
    * **NOTE** `timedelta`s can be added together, and can be added to `timestamps`, but two `timestamps` cannot be added.
* Wei: `wei_value` (`uint256`)
* You can also make custom units 
    * `units: {
        cm: "centimeter"
    }`
    And using it `a: int128(cm)`
* Byte 32 array: `bytes32`
    * Operators that use `bytes32`
    * `sha3` has: `sha3( <bytes32> )`
    * concatenation: `concat( <bytes32>, ... )`
    * slicing: `slice( <bytes32, start=_start, len=_len )` returns a slice of the specified length (`_len`) starting at `_start`
* Fixed-sized byte array: `bytes[maxLength]` i.e `bytes[100]`, the size is fixed and cannot be unspecified
* Fixed-size strings: `string[maxLength]` i.e `string[100]`
    * Operators that use `string`s
    * length: `len( <string> )`
    * `sha3` hash: `sha3( <string> )` 
    * concatenation: `concat( <string>, ... )`
    * slicing: `slice( <string>, start=_start, len=_len)` (same as `bytes32` slicing)
* Fixed-sized lists: `_name: VariableType[_size]` (multidimensional lists are possible i.e `_allowances: uint256[100][100]`)
* structs: 
```
struct StructName:
    value1: int128
    value2: string[100]
#Constructing:
exampleStruct = MyStruct({value1: 123, value2: "string"})
#Getting data out
exampleStruct.value1 = 1
```
* 
Declaring a function

# Resources
https://vyper.readthedocs.io/en/latest/types.html#types
https://vyper.readthedocs.io/en/latest/structure-of-a-contract.html
https://medium.com/@rossbulat/get-started-with-vyper-the-pythonic-ethereum-smart-contract-language-e5e58969087e
https://medium.com/coinmonks/learn-the-ethereum-language-vyper-from-within-your-browser-b084ec51302
https://vyper.readthedocs.io/en/latest/vyper-by-example.html
https://www.google.com/search?q=vyper+docs&oq=vyper+docs&aqs=chrome..69i57j0.2088j0j7&sourceid=chrome&ie=UTF-8
https://www.google.com/search?q=vyper+ethereum&oq=vyper+ethereum&aqs=chrome..69i57j0l4.6262j0j7&sourceid=chrome&ie=UTF-8