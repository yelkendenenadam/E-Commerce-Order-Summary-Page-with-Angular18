import {IAddress} from "./iaddress";

export interface IShipping {
  carrier: string;
  address: IAddress;
  cost: number;
}
