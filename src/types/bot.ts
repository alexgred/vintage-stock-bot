import { ParseMode } from 'grammy/types';

export interface notificationOther {
  parse_mode?: ParseMode;
  disable_notification?: boolean;
  link_preview_options?: { is_disabled?: boolean; url?: string };
}


export interface Order {
  id: number;
  name: string;
  userId: number;
  user: string | undefined;
  price: number;
  timestamp: number;
  minutes: number;
  spot: boolean;
  done: boolean;
}

export type Zero = number | undefined;

export type NotUndefined = string | number | boolean | object;
