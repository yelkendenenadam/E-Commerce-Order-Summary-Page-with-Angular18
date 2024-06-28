import {IOrder} from "./iorder";
import {IShipping} from "./ishipping";
import {ITax} from "./itax";

export interface IOrderSummary {
  order: IOrder[];
  shipping: IShipping;
  tax: ITax;
}
