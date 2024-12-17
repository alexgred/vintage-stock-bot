import { Composer, InlineKeyboard } from 'grammy';
import { BotContext } from '@/types';
import { orderChoice } from '@/utils';

const callbackComposer = new Composer<BotContext>();

callbackComposer.callbackQuery('commands', async (ctx) => {
  const message =
    '<strong>Команды:</strong>\n\n<i>/start</i> - запустить бота\n<i>/help</i> - помощь\n<i>/address</i> - адрес\n<i>/coffee</i> - заказать кофе';

  await ctx.answerCallbackQuery();
  await ctx.reply(message, {
    parse_mode: 'HTML',
  });
});

callbackComposer.callbackQuery('address', async (ctx) => {
  const message = '<strong>Адрес:</strong> Горького 123';

  const button = new InlineKeyboard().url(
    'Показать на карте',
    'https://yandex.ru/maps/-/CDwffQ0f',
  );

  await ctx.answerCallbackQuery();
  await ctx.reply(message, {
    parse_mode: 'HTML',
    reply_markup: button,
  });
});

callbackComposer.callbackQuery('coffee', async (ctx) => {
  await ctx.answerCallbackQuery();

  await orderChoice(ctx);
});

callbackComposer.callbackQuery('coffee-to-go', async (ctx) => {
  await ctx.conversation.exit();
  await ctx.answerCallbackQuery();
  await ctx.conversation.enter('coffeeConversation');
});

callbackComposer.callbackQuery('coffee-to-site', async (ctx) => {
  await ctx.conversation.exit();
  await ctx.answerCallbackQuery();
  await ctx.conversation.enter('coffeeConversation');
});

callbackComposer.on('callback_query:data', async (ctx) => {
  await ctx.answerCallbackQuery();
});

export { callbackComposer };
