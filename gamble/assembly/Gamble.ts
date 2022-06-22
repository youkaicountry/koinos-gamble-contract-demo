import { System, authority, Token, Base58} from "koinos-sdk-as";
import { gamble } from "./proto/gamble";

namespace Constants {
  export const TOKEN_CONTRACT_ID = Base58.decode('19JntSm8pSNETT9aHTwAUHC5RMoaSmgZPJ');
}

export class Gamble {
  flip(args: gamble.flip_arguments): gamble.flip_result {
    // Grab arguments
    const address = args.address!;
    const wager = args.wager;
    const heads = args.heads;

    const contract_id = System.getContractId();

    // Check authority
    System.requireAuthority(authority.authorization_type.contract_call, address);

    const token = new Token(Constants.TOKEN_CONTRACT_ID);

    // Ensure address and contract has enough KOIN
    System.require(token.balanceOf(address), "address has insufficient balance to cover wager");
    System.require(token.balanceOf(contract_id), "contract has insufficient balance to cover wager");

    // Get head info, interpret as heads or tails
    const head_info = System.getHeadInfo();
    const block_heads:boolean = ((head_info.head_topology!.id![31]) & 1) == 1 ? true : false;

    // User wins
    if (heads == block_heads) {
      System.require(token.transfer(contract_id, address, wager), "cannot transfer to address");
    }
    else { // Contract wins
      System.require(token.transfer(address, contract_id, wager), "cannot transfer to contract");
    }

    return new gamble.flip_result();
  }
}
