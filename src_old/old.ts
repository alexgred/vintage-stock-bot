import { Scenes, session, Telegraf, Markup } from 'telegraf';

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ADMIN_IDS = process.env.ADMIN_IDS?.split(',').map(Number) || [];

const commands = [
  {
    command: '/start',
    description: 'Start the bot',
  },
  {
    command: '/help',
    description: 'Get help',
  },
];

const bot = new Telegraf<Scenes.SceneContext>(BOT_TOKEN);

bot.telegram.setMyCommands(commands);

bot.start((ctx) => {
  if (ADMIN_IDS.indexOf(ctx.from.id) !== -1) {
    ctx.reply(
      'Hello, master!',
      Markup.keyboard(['Post']).resize().persistent(),
    );
  } else {
    ctx.reply('Welcome', Markup.removeKeyboard());
    console.log(ctx.from);
  }
});
bot.help((ctx) => ctx.reply(ctx.chat.id.toString()));

const postScene = new Scenes.BaseScene<Scenes.SceneContext>('post');
postScene.enter((ctx) => ctx.reply('Write post here:'));
postScene.on('message', (ctx) => {
  // const messageId = ctx.message.message_id;
  ctx.copyMessage('@alexgred_dev', {
    reply_markup: {
      inline_keyboard: [[Markup.button.callback('Done', 'done')]],
      // inline_keyboard: [
      //   [
      //     Markup.button.url(
      //       'Done',
      //       `tg://resolve?domain=dudimiSH&post=${messageId}`,
      //     ),
      //   ],
      // ],
    },
  });
});
postScene.leave((ctx) => ctx.reply('Done!'));

bot.action('done', (ctx) => {
  // ctx.forwardMessage(828407214);
  console.log(ctx.callbackQuery.message);
  bot.telegram.sendMessage(828407214, 'Hey!');
});

const stage = new Scenes.Stage<Scenes.SceneContext>([postScene], {
  ttl: 10,
});

bot.use(session());
bot.use(stage.middleware());

bot.hears('Post', (ctx) => {
  ctx.scene.enter('post');
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
