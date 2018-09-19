import { TradeTypes } from "./tradeTypes";
import { Currency } from "./currency";
import { User } from "./user";

export class Trade {
  public id: string;
  public type: TradeTypes;
  public amount: number;
  public createdOn: Date;
  public targetCurrency: Currency;
  public trader: User;
}
