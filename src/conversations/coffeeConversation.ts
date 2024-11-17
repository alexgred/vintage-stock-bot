import { BotContext, BotConversation, Order } from '@/types';
import axios from 'axios';
import { Keyboard } from 'grammy';
import { coffees, times, url } from '../config';

export async function coffeeConversation(
  conversation: BotConversation,
  ctx: BotContext,
) {
  const buttonsCoffee = new Keyboard();
  coffees.forEach((coffee) => {
    buttonsCoffee.text(coffee.label);
  });
  const keyboardCoffee = buttonsCoffee.resized().oneTime().toFlowed(2);
  await ctx.reply('Какой вам кофе?', {
    reply_markup: keyboardCoffee,
  });

  const { message: coffee } = await conversation.waitForHears(
    coffees.map((coffee) => coffee.label),
    (ctx) => {
      return ctx.reply('Вы не выбрали какой вам кофе.', {
        reply_markup: keyboardCoffee,
      });
    },
  );

  const buttonsTime = new Keyboard();
  times.forEach((time) => {
    buttonsTime.text(time.label);
  });
  const keyboardTime = buttonsTime.resized().oneTime().toFlowed(2);
  await ctx.reply('Через сколько вы будет?', {
    reply_markup: keyboardTime,
  });

  const { message: time } = await conversation.waitFor(
    'message:text',
    (ctx) => {
      return ctx.reply('Вы не указали через сколько вы будет?', {
        reply_markup: keyboardCoffee,
      });
    },
  );

  let message = '';
  if (time?.text === 'Я в магазине') {
    message = `Готовим ваш ${coffee?.text?.toLocaleLowerCase()}. Пришлем уведомление, когда он будет готов.`;
  } else {
    message = `Ваш ${coffee?.text?.toLocaleLowerCase()} будет готов через ${
      time?.text
    }. Спасибо ждем вас!`;
  }

  if (coffee?.text && time?.text) {
    const data: Order = {
      id: coffee.date + time.date,
      name: coffee.text,
      userId: ctx.from?.id as number,
      user: coffee.from.username,
      price: coffees.find((c) => c.label === coffee.text)?.value || -1,
      timestamp: Date.now(),
      minutes: times.find((c) => c.label === time.text)?.value || -1,
      done: false,
    };

    await conversation.external(() =>
      axios.post(url, data).catch((error) => {
        console.log(error);
      }),
    );

    await ctx.reply(message, {
      reply_markup: { remove_keyboard: true },
    });
  }
}
