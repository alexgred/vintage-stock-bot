import { Composer, } from 'grammy';
import { BotContext } from '@/types';
import { orderChoice } from '@/utils';

const orderComposer = new Composer<BotContext>();

orderComposer.command('order', async (ctx) => {
  await ctx.conversation.exit();
  await orderChoice(ctx);
});

export { orderComposer };
