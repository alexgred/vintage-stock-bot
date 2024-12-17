import { Composer, InlineKeyboard } from 'grammy';
import { BotContext } from '@/types';

const startComposer = new Composer<BotContext>();

startComposer.command('start', async (ctx) => {
  const message =
    '<strong>Привет!</strong>\n\nЯ бот Архив. Наш магазин находиться по адресу: <i><a href="https://yandex.ru/maps/-/CDwffQ0f">Горького 123</a></i>.\n\nСкоро здесь будет много всего интересного, а сейчас ты можешь заказать кофе, пока идешь к нам.';

  const button = new InlineKeyboard().text('Заказать кофе', 'coffee');

  await ctx.reply(message, {
    parse_mode: 'HTML',
    reply_markup: button,
    link_preview_options: { is_disabled: true },
  });
});

export { startComposer };
