import { Markup, Scenes, Telegraf } from "telegraf";
import { Command } from "./command.class";
import { CoffeeScene } from "../scene/coffee.scene";

export class CoffeeCommand extends Command {
  constructor(bot: Telegraf<Scenes.WizardContext>) {
    super(bot);
  }

  init(): void {
    const message = 'Заказать кофе';

    this.bot.command('coffee', (ctx) => {
      ctx.replyWithHTML(message, {
        reply_markup: {
          inline_keyboard: [
            [Markup.button.callback('Заказать кофе', 'coffee1')],
          ],
        },
        link_preview_options: {
          is_disabled: true,
        },
      });

      console.log(ctx);
    });

    this.bot.action('coffee1', (ctx) => {
      console.log(ctx);

      const scene = new CoffeeScene(this.bot);
      scene.init();

      /* fetch('http://localhost:3000/api/orders/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: ctx.msgId,
          name: 'Кофе приготовлен',
          user: `@${ctx.from.username}`,
          price: 1000,
          timestamp: Date.now(),
          minutes: 15,
          done: false,
        }),
      }); */
    });
  }
}
