import { Composer, InlineKeyboard } from 'grammy';
import { BotContext } from '@/types';


const helpComposer = new Composer<BotContext>();

helpComposer.command('help', async (ctx) => {
  const message = 'Чем я могу помочь?';

  const keyboard = new InlineKeyboard();
  keyboard.text('Команды', 'commands');
  keyboard.text('Адрес', 'address');
  keyboard.text('Заказать напиток?', 'coffee');

  await ctx.reply(message, {
    reply_markup: keyboard.toFlowed(2),
  });
});

export { helpComposer };
