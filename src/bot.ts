import { Bot, GrammyError, HttpError, session } from 'grammy';
import { helpComposer, startComposer, callbackComposer, coffeeComposer } from '@/composers';
import { BotContext, notificationOther, Config } from '@/types';
import { conversations, createConversation } from '@grammyjs/conversations';
import { coffeeConversation } from '@/conversations';


export class VintageStockBot {
  private bot: Bot<BotContext>;
  private readonly commands = [
    {
      command: '/start',
      description: 'Start the bot',
    },
    {
      command: '/help',
      description: 'Get help',
    },
  ];

  constructor(private readonly config: Config) {
    this.bot = new Bot<BotContext>(this.config.get('BOT_TOKEN'));

    this.bot.use(session({ initial: () => ({}) }));
    this.bot.use(conversations());

    this.bot.use(createConversation(coffeeConversation));

    this.setCallbacks();
    this.setCommands();

    this.setErrorHandler();
  }

  private setCallbacks(): void {
    this.bot.use(callbackComposer);
  }

  private setCommands(): void {
    this.bot.use(startComposer);
    this.bot.use(helpComposer);
    this.bot.use(coffeeComposer);
  }

  public async sendNotification(
    id: number,
    message: string,
    options?: notificationOther,
  ): Promise<void> {
    await this.bot.api.sendMessage(id, message, options);
  }

  private setErrorHandler(): void {
    this.bot.catch((err) => {
      const ctx = err.ctx;
      console.error(`Error while handling update ${ctx.update.update_id}:`);
      const e = err.error;
      if (e instanceof GrammyError) {
        console.error('Error in request:', e.description);
      } else if (e instanceof HttpError) {
        console.error('Could not contact Telegram:', e);
      } else {
        console.error('Unknown error:', e);
      }
    });
  }

  /**
   * Launch the bot.
   */
  public async start(): Promise<void> {
    await this.bot.api.setMyCommands(this.commands);

    process.once('SIGINT', () => this.bot.stop());
    process.once('SIGTERM', () => this.bot.stop());

    await this.bot.start();
  }
}
