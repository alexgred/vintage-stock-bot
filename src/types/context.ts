import { Context } from "grammy";
import { ConversationFlavor, Conversation } from '@grammyjs/conversations';

export type BotContext = Context & ConversationFlavor;
export type BotConversation = Conversation<BotContext>;
