import { VintageStockBot } from "./bot";
import { Config } from "./config";

const bot = new VintageStockBot(new Config());

bot.start();
