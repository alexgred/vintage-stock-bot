import { Markup, Scenes, Telegraf } from "telegraf";
import { Command } from "./command.class";

export class StartCommand extends Command {
  constructor(bot: Telegraf<Scenes.WizardContext>) {
    super(bot);
  }

  init(): void {
    const message =
      '<strong>Привет!</strong>\n\nЯ бот Архив. Наш магазин находиться по адресу: <i><a href="https://yandex.ru/maps/-/CDwffQ0f">Горького 123</a></i>.\n\nСкоро здесь будет много всего интересного, а сейчас ты можешь заказать кофе, пока идешь к нам.';

    this.bot.start((ctx) => {
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
    });
  }
}
