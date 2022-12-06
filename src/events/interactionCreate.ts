import { Interaction } from 'discord.js';
import { DiscordCommand, DiscordEvent } from '../../types';
import commands from '../commands';

const interactionCreate: DiscordEvent = {
  name: 'interactionCreate',
  once: false,
  execute: async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;

    const command = commands.find(
      (c: DiscordCommand) => c.data.name === interaction.commandName
    );

    if (!command) return;

    try {
      command.execute(interaction);
    } catch (e) {
      console.error(e);
      await interaction.reply({
        content: 'There was an error while exexuting this command!',
        ephemeral: true,
      });
    }
  },
};

export default interactionCreate;
