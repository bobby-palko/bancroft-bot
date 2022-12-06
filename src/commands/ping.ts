import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { DiscordCommand } from '../../types';

const ping: DiscordCommand = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),

  execute: async (interaction: CommandInteraction) => {
    await interaction.reply('Pong');
  },
};

export default ping;
