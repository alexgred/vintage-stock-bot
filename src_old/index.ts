import { Bot } from './bot';
import { Config } from './config';

const bot = new Bot(new Config());
bot.launch();
