import { Composer } from 'grammy';
import { BotContext } from '@/types';

const coffeeComposer = new Composer<BotContext>();

coffeeComposer.command('coffee', async (ctx) => {
  await ctx.conversation.enter('coffeeConversation');
});

export { coffeeComposer };
