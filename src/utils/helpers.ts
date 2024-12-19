import { Zero } from "@/types";

export function checkZero(num: Zero): number {
  if (num  === undefined || num < 0) {
    return -1;
  }

  return num;
}
