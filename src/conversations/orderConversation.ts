import { BotContext, BotConversation, Order } from '@/types';
import axios from 'axios';
import { drinks, times, url } from '../config';
import { checkZero, generateOrderButtons, orderFinalMessage } from '@/utils';

export async function orderConversation(
  conversation: BotConversation,
  ctx: BotContext,
) {
  const keyboardCoffee = generateOrderButtons(drinks);
  await ctx.reply('Какой вам напиток?', {
    reply_markup: keyboardCoffee,
  });

  const { callbackQuery: drink } = await conversation.waitForCallbackQuery(
    drinks.map((drink) => drink.data),
    {
      drop: true,
      otherwise: async (ctx) => {
        return ctx.reply('Вы не выбрали какой вам напиток.');
      },
    },
  );
  const name = drinks.find((c) => c.data === drink.data)?.label;

  const keyboardTime = generateOrderButtons(times);
  const messageOrder = `\n\n<i>Напиток: ${name}</i>`;
  await ctx.reply(`Через сколько вы будет?${messageOrder}`, {
    reply_markup: keyboardTime,
    parse_mode: 'HTML',
  });
  if (drink.message) {
    await ctx.deleteMessages([drink.message.message_id]);
  }

  const { callbackQuery: time } = await conversation.waitForCallbackQuery(
    times.map((time) => time.data),
    {
      drop: true,
      otherwise: (ctx) => {
        return ctx.reply('Вы не указали через сколько вы будет?');
      },
    },
  );
  const minutes = times.find((c) => c.data === time.data)?.label;

  if (drink.message && time?.message && name && minutes) {
    const data: Order = {
      id: drink.message.date + time.message.date,
      name: name,
      userId: ctx.from?.id as number,
      user: drink.from.username,
      price: checkZero(drinks.find((c) => c.label === name)?.value),
      timestamp: await conversation.now(),
      minutes: checkZero(times.find((c) => c.label === minutes)?.value),
      spot: true,
      done: false,
    };

    console.log(data);

    await conversation.external(() =>
      axios.post(url, data).catch((error) => {
        console.log(error);
      }),
    );

    const message = orderFinalMessage(name, minutes, messageOrder);

    await ctx.reply(message, {
      parse_mode: 'HTML',
    });
    if (time.message) {
      await ctx.deleteMessages([time.message.message_id]);
    }
  }
}
