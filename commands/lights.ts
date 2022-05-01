/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from 'axios';
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { MyCommand } from '../types';
import { homeAssistantToken, baseURL } from '../config.json';

const lights: MyCommand = {
  data: new SlashCommandBuilder()
    .setName('lights')
    .setDescription('Toggles the lights on and off!')
    .addStringOption((option) =>
      option
        .setName('room')
        .setDescription("the room where we're toggling lights")
        .setRequired(true)
        .addChoice('Living Room', 'group.lr_lights')
        .addChoice('Office', 'light.office_lights')
        .addChoice('Bedroom', 'light.bedroom_lights')
    ),
  execute: async (interaction: CommandInteraction) => {
    await interaction.deferReply();
    const room = interaction.options.getString('room');

    const instance = axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${homeAssistantToken}`,
        'content-type': 'application/json',
      },
    });

    await instance
      .post('/api/services/homeassistant/toggle', {
        entity_id: room,
      })
      .then((res) => {
        console.log(res.data);
        // we don't always get all entities back; one is good enough for a group
        const [entity] = res.data;
        interaction.editReply(
          entity
            ? `Lights have been turned ${entity.state}.`
            : `Command executed, but who knows if it worked?`
        );
      })
      .catch((e) => {
        interaction.editReply(`Something went wrong: ${e}`);
      });
  },
};

export { lights };
