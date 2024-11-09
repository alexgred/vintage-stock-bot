import { ParseMode } from 'grammy/types';

export interface notificationOther {
  parse_mode?: ParseMode;
  disable_notification?: boolean;
  link_preview_options?: { is_disabled?: boolean; url?: string };
}


export interface Order {
  id: number;
  name: string;
  user: string | undefined;
  price: number;
  timestamp: number;
  minutes: number;
  done: boolean;
}
