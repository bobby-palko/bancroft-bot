import { Interaction } from 'discord.js';

import { Commands } from '../commands';
import { MyCommand, MyEvent } from '../types';

const interactionCreate: MyEvent = {
  name: 'interactionCreate',
  once: false,
  execute: async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;

    const command = Commands.find(
      (c: MyCommand) => c.data.name === interaction.commandName
    );
    // client.commands.get(interaction.commandName) as MyCommand;

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

export { interactionCreate };
