# koinos-gamble-contract-demo

## Building the contract

Make sure you are in the `gamble` directory, then execute

`yarn install`

 to fetch dependencies.

Then execute

`yarn exec koinos-sdk-as-cli build-all release gamble.proto`

to build the contract and ABI.

The contract is locatyed at

`build/release/contract.wasm`

and the ABI is located at

`abi/gamble.abi`
