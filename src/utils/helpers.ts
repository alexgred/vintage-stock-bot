import { Zero } from "@/types";

export function checkZero(num: Zero): number {
  if (num  === undefined || num < 0) {
    return -1;
  }

  return num;
}

export function orderFinalMessage(
  name: string,
  minutes: string,
  prevMessageOrder: string,
): string {
  const messageOrder = `${prevMessageOrder}\n<i>Время: ${minutes}</i>`;
  if (minutes === 'Я в магазине') {
    return `Готовим ваш ${name?.toLocaleLowerCase()}. Пришлем уведомление, когда он будет готов.${messageOrder}`;
  } else {
    return `Ваш ${name?.toLocaleLowerCase()} будет готов через ${minutes}. Спасибо ждем вас!${messageOrder}`;
  }
}
