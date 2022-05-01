/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from 'axios';
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { MyCommand } from '../types';
import {
  homeAssistantToken,
  baseURL,
  alarmCode,
  alarmEntity,
} from '../config.json';

const alarm: MyCommand = {
  data: new SlashCommandBuilder()
    .setName('alarm')
    .setDescription('Arms or disarms the alarm')
    .addStringOption((option) =>
      option
        .setName('option')
        .setDescription('set the alarm state')
        .setRequired(true)
        .addChoice('Away', 'alarm_arm_away')
        .addChoice('Home', 'alarm_arm_home')
        .addChoice('Disarm', 'alarm_disarm')
    ),
  execute: async (interaction: CommandInteraction) => {
    await interaction.deferReply();
    const armState = interaction.options.getString('option');

    const instance = axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${homeAssistantToken}`,
        'content-type': 'application/json',
      },
    });

    await instance
      .post(`/api/services/alarm_control_panel/${armState}`, {
        code: alarmCode,
        entity_id: alarmEntity,
      })
      .then((res) => {
        console.log(res.data);
        // we don't always get all entities back; one is good enough for a group
        const [entity] = res.data;
        interaction.editReply(
          entity
            ? `Alarm has been set to ${entity.state}.`
            : `Command executed, but who knows if it worked?`
        );
      })
      .catch((e) => {
        console.log(e);
        interaction.editReply(`Something went wrong: ${e}`);
      });
  },
};

export { alarm };
