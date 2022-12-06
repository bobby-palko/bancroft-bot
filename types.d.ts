import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

export interface DiscordCommand {
  data: Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
  execute: (interaction: CommandInteraction) => void;
}

export interface DiscordEvent {
  name: string;
  once: boolean;
  execute: (...any: any) => void;
}

export interface DiscordRequest {
  post: (arg0: DiscordRequestOptions) => Promise<HAEntity[]>;
  get: (arg0: DiscordRequestOptions) => Promise<HAEntity[]>;
}

export interface DiscordRequestOptions {
  url: string;
  token: string;
  data?: Record<string, unknown>;
}

export interface HAEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, string | number | string[]>;
  last_changed: string;
  last_updated: string;
  context: {
    id: string;
    parent_id: string | null;
    user_id: string | null;
  };
}

export interface HAStates {
  entity: string;
  entityStatus: string;
  name: string;
}
