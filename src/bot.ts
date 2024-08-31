import { Telegraf } from 'telegraf';
import { ConfigClass } from './config/config.interface';

export class Bot {
  bot: Telegraf;

  constructor(private readonly config: ConfigClass) {
    this.bot = new Telegraf(this.config.get('BOT_TOKEN'));
  }

  /**
   * Launches the bot.
   */
  launch() {
    this.bot.launch();
  }
}
