import { Markup, Scenes, Telegraf } from "telegraf";
import { Command } from "./command.class";

export class HelpCommand extends Command {
  constructor(bot: Telegraf<Scenes.WizardContext>) {
    super(bot);
  }

  init(): void {
    const message = 'Чем я могу помочь?';
    this.bot.help((ctx) => {
      ctx.reply(
        message,
        Markup.inlineKeyboard([
          Markup.button.callback('Команды', 'commands'),
          Markup.button.callback('Адрес', 'address'),
          Markup.button.callback('Как заказать кофе?', 'coffee'),
        ]),
      );
    });

    this.bot.action('commands', (ctx) => {
      const message =
        '<strong>Команды:</strong>\n\n<i>/start</i> - запустить бота\n<i>/help</i> - помощь\n<i>/address</i> - адрес\n<i>/coffee</i> - заказать кофе';
      ctx.replyWithHTML(message);
    });

    this.bot.action('address', (ctx) => {
      ctx.replyWithHTML(
        '<strong>Адрес:</strong> Горького 123',
        Markup.inlineKeyboard([
          Markup.button.url(
            'Показать на карте',
            'https://yandex.ru/maps/-/CDwffQ0f',
          ),
        ]),
      );
    });

    this.bot.action('coffee', (ctx) => {
      ctx.answerCbQuery('Кофе приготовлен');
    });
  }
}
