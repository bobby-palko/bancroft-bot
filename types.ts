import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

interface MyCommand {
  data: Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
  execute: (interaction: CommandInteraction) => void;
}

interface MyEvent {
  name: string;
  once: boolean;
  execute: (...any: any) => void;
}

interface HAEntities {
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

interface MyStates {
  entity: string;
  entityStatus: string;
  name: string;
}

export { MyCommand, MyEvent, HAEntities, MyStates };
