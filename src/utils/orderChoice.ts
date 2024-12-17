import { BotContext } from "@/types";
import { InlineKeyboard } from "grammy";


export async function orderChoice(ctx: BotContext): Promise<void> {
  const keyboard = new InlineKeyboard()
    .text('С собой', 'coffee-to-go')
    .text('На месте', 'coffee-to-site');

  await ctx.reply('Вам напиток с собой или на месте?', {
    reply_markup: keyboard,
  });
}
