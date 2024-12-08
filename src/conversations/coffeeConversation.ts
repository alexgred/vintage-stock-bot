import { BotContext, BotConversation, Order } from '@/types';
import axios from 'axios';
import { InlineKeyboard } from 'grammy';
import { coffees, times, url } from '../config';

export async function coffeeConversation(
  conversation: BotConversation,
  ctx: BotContext,
) {
  const buttonsCoffee = new InlineKeyboard();
  coffees.forEach((coffee) => {
    buttonsCoffee.text(coffee.label, coffee.data);
  });
  buttonsCoffee.text('Отмена', 'cancel');
  const keyboardCoffee = buttonsCoffee.toFlowed(2);
  await ctx.reply('Какой вам кофе?', {
    reply_markup: keyboardCoffee,
  });

  const { callbackQuery: coffee }  = await conversation.waitForCallbackQuery(
    coffees.map((coffee) => coffee.data),
    {
      drop: true,
      otherwise: async (ctx) => {
        return ctx.reply('Вы не выбрали какой вам кофе.', {
          reply_markup: keyboardCoffee,
        });
      },
    },
  );

  const buttonsTime = new InlineKeyboard();
  times.forEach((time) => {
    buttonsTime.text(time.label, time.data);
  });
  buttonsTime.text('Отмена', 'cancel');
  const keyboardTime = buttonsTime.toFlowed(2);
  await ctx.reply('Через сколько вы будет?', {
    reply_markup: keyboardTime,
  });

  const { callbackQuery: time } = await conversation.waitForCallbackQuery(
    times.map((time) => time.data),
    {
      drop: true,
      otherwise:(ctx) => {
        return ctx.reply('Вы не указали через сколько вы будет?', {
          reply_markup: keyboardTime,
        });
      }
    },
  );

  const name = coffees.find((c) => c.data === coffee.data)?.label;
  const minutes = times.find((c) => c.data === time.data)?.label;

  let message = '';
  if (minutes === 'Я в магазине') {
    message = `Готовим ваш ${name?.toLocaleLowerCase()}. Пришлем уведомление, когда он будет готов.`;
  } else {
    message = `Ваш ${name?.toLocaleLowerCase()} будет готов через ${minutes}. Спасибо ждем вас!`;
  }

  if (coffee.message && time?.message && name) {
    const data: Order = {
      id: coffee.message.date + time.message.date,
      name: name,
      userId: ctx.from?.id as number,
      user: coffee.from.username,
      price: coffees.find((c) => c.data === name)?.value || -1,
      timestamp: await conversation.now(),
      minutes: times.find((c) => c.data === minutes)?.value || -1,
      done: false,
    };

    conversation.log(data);

    await conversation.external(() =>
      axios.post(url, data).catch((error) => {
        console.log(error);
      }),
    );

    await ctx.reply(message);
  }
}
