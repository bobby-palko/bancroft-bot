import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { MyCommand } from '../types';

const ping: MyCommand = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  execute: async (interaction: CommandInteraction) => {
    await interaction.reply('Pong');
  },
};

export { ping };
