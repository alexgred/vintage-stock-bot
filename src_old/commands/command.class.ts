import { Scenes, Telegraf } from "telegraf";

export abstract class Command {
  constructor(public bot: Telegraf<Scenes.WizardContext>) {}

  abstract init(): void;
}
