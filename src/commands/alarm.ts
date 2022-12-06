import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { exit } from 'process';

import request from '../lib/request';
import { BASE_HA_URL, HA_TOKEN, ALARM_CODE } from '../lib/conf';
import { DiscordCommand } from '../../types';

const alarm: DiscordCommand = {
  data: new SlashCommandBuilder()
    .setName('alarm')
    .setDescription('Arms or disarms the alarm')
    .addStringOption((option) =>
      option
        .setName('option')
        .setDescription('set the alarm state')
        .setRequired(true)
        .addChoices(
          { name: 'Away', value: 'alarm_arm_away' },
          { name: 'Home', value: 'alarm_arm_home' },
          { name: 'Disarm', value: 'alarm_disarm' }
        )
    ),

  execute: async (interaction: CommandInteraction) => {
    await interaction.deferReply();
    const armState = interaction.options.get('option');

    if (!armState) {
      console.log('no alarm state!');
      exit(1);
    }

    const response = await request.post({
      url: `${BASE_HA_URL}/api/services/alarm_control_panel/${
        armState.value as string
      }`,
      token: HA_TOKEN,
      data: {
        code: ALARM_CODE,
        entity_id: 'alarm_control_panel.alarm_control_panel',
      },
    });

    if (response) {
      // if any entity came back it worked
      const [entity] = response;
      interaction.editReply(
        entity
          ? `Alarm has been set to ${entity.state}.`
          : `Command executed, but who knows if it worked?`
      );
    } else {
      interaction.editReply('Something went wrong! No response from HA');
    }
  },
};

export default alarm;
