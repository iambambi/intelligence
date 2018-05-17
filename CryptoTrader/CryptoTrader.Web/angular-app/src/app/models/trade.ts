import { TradeTypes } from "./tradeTypes";
import { Currency } from "./currency";
import { User } from "./user";

export class Trade {
  public id: string;
  public amount: number;
  public targetCurrency: Currency;
}
