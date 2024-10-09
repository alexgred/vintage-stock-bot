import { Scenes, Telegraf } from 'telegraf';
import { ConfigClass } from './config/config.interface';
import { Command } from './commands/command.class';
import { StartCommand, HelpCommand, CoffeeCommand } from './commands';

export class Bot {
  bot: Telegraf<Scenes.WizardContext>;
  commands: Command[] = [];

  constructor(private readonly config: ConfigClass) {
    this.bot = new Telegraf<Scenes.WizardContext>(this.config.get('BOT_TOKEN'));
  }

  /**
   * Launches the bot.
   */
  launch() {
    this.commands = [
      new StartCommand(this.bot),
      new HelpCommand(this.bot),
      new CoffeeCommand(this.bot),
    ];
    for (const command of this.commands) {
      command.init();
    }

    this.bot.launch();
  }
}
