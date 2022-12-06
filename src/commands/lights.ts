import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { exit } from 'process';

import request from '../lib/request';
import { HA_TOKEN, BASE_HA_URL } from '../lib/conf';
import { DiscordCommand } from '../../types';

const lights: DiscordCommand = {
  data: new SlashCommandBuilder()
    .setName('lights')
    .setDescription('Toggles the lights on and off!')
    .addStringOption((option) =>
      option
        .setName('room')
        .setDescription("the room where we're toggling lights")
        .setRequired(true)
        .addChoices(
          { name: 'Living Room', value: 'group.lr_lights' },
          { name: 'Office', value: 'light.office_lights' },
          { name: 'Bedroom', value: 'light.bedroom_lights' }
        )
    ),

  execute: async (interaction: CommandInteraction) => {
    await interaction.deferReply();
    const room = interaction.options.get('room');

    if (!room) {
      console.log('no room!');
      exit(1);
    }
    const response = await request.post({
      url: `${BASE_HA_URL}/api/services/homeassistant/toggle`,
      token: HA_TOKEN,
      data: {
        entity_id: room.value,
      },
    });

    if (response) {
      // if any entity came back it worked
      const [entity] = response;
      interaction.editReply(
        entity
          ? `Lights have been turned ${entity.state}.`
          : `Command executed, but who knows if it worked?`
      );
    } else {
      interaction.editReply('Something went wrong! No response from HA');
    }
  },
};

export default lights;
