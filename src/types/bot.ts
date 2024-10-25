import { ParseMode } from 'grammy/types';

export interface notificationOther {
  parse_mode?: ParseMode;
  disable_notification?: boolean;
  link_preview_options?: { is_disabled?: boolean; url?: string };
}
