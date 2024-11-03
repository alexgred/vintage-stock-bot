import { BotContext, BotConversation, Order } from '@/types';
import { Keyboard } from 'grammy';

export async function coffeeConversation(
  conversation: BotConversation,
  ctx: BotContext,
) {
  const keyboardCoffee = new Keyboard()
    .text('Раф')
    .text('Капучино')
    .text('Латте')
    .text('Американо')
    .resized()
    .toFlowed(2);
  await ctx.reply('Какой вам кофе?', {
    reply_markup: keyboardCoffee,
  });

  const { message: coffee } = await conversation.wait();
  const keyboardTime = new Keyboard()
    .text('Я в магазине')
    .text('15')
    .text('45')
    .resized()
    .oneTime()
    .toFlowed(2);
  await ctx.reply('Через сколько минут вы будет?', {
    reply_markup: keyboardTime,
  });

  const { message: time } = await conversation.wait();

  let message = '';
  if (time?.text === 'Я в магазине') {
    message = `Готовим ваш ${coffee?.text?.toLocaleLowerCase()}. Пришлю уведомление когда будет он готов.`;
  } else {
    message = `Ваш ${coffee?.text?.toLocaleLowerCase()} будет готов через ${time?.text} минут. Спасибо ждем вас!`;
  }

  await ctx.reply(message);

  if (coffee?.text && time?.text) {
    const data: Order = {
      id: coffee.date + time.date,
      name: coffee.text,
      user: `https://t.me/${coffee?.from?.username}`,
      price: 0,
      timestamp: Date.now(),
      minutes: Number(time?.text),
      done: false,
    };

    console.log(data);
  }
}
