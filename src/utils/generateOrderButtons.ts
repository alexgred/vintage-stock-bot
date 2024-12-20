import { InlineKeyboard } from 'grammy';

type Button = {
  label: string;
  data: string;
};

export function generateOrderButtons(
  btns: Button[],
  flowed: number = 2,
): InlineKeyboard {
  const buttonsDrink = new InlineKeyboard();
  btns.forEach((btn) => {
    buttonsDrink.text(btn.label, btn.data);
  });
  buttonsDrink.text('Отмена', 'cancel');
  const keyboardCoffee = buttonsDrink.toFlowed(flowed);

  return keyboardCoffee;
}
