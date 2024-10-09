import { Composer, Markup, Scenes, session, Telegraf } from 'telegraf';

export class CoffeeScene {
  stepHandler: Composer<Scenes.WizardContext>;
  constructor(public bot: Telegraf<Scenes.WizardContext>) {
    this.stepHandler = new Composer<Scenes.WizardContext>();
  }

  composer() {
    this.stepHandler.action('next', async (ctx) => {
      await ctx.reply('Step 2. Via inline button');
      return ctx.wizard.next();
    });
    this.stepHandler.command('next', async (ctx) => {
      await ctx.reply('Step 2. Via command');
      return ctx.wizard.next();
    });
    this.stepHandler.use((ctx) =>
      ctx.reply('Press `Next` button or type /next'),
    );
  }

  init() {
    this.composer();

    const superWizard = new Scenes.WizardScene(
      'super-wizard',
      async (ctx) => {
        await ctx.reply(
          'Step 1',
          Markup.inlineKeyboard([
            Markup.button.url('❤️', 'http://telegraf.js.org'),
            Markup.button.callback('➡️ Next', 'next'),
          ]),
        );
        return ctx.wizard.next();
      },
      this.stepHandler,
      async (ctx) => {
        await ctx.reply('Step 3');
        return ctx.wizard.next();
      },
      async (ctx) => {
        await ctx.reply('Step 4');
        return ctx.wizard.next();
      },
      async (ctx) => {
        await ctx.reply('Done');
        return await ctx.scene.leave();
      },
    );

    const stage = new Scenes.Stage<Scenes.WizardContext>([superWizard], {
      default: 'super-wizard',
    });

    this.bot.use(session());
    this.bot.use(stage.middleware());
  }
}
