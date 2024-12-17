import { Composer } from 'grammy';
import { BotContext } from '@/types';

const conversationCallbackComposer = new Composer<BotContext>();


conversationCallbackComposer.callbackQuery('cancel', async (ctx) => {
  await ctx.conversation.exit();
  await ctx.answerCallbackQuery({ text: 'Заказ отменен' });
  await ctx.reply('Заказ отменен');
  await ctx.deleteMessage();
});

export { conversationCallbackComposer };
