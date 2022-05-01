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

export { MyCommand, MyEvent };
