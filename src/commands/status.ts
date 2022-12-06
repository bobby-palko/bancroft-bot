import { SlashCommandBuilder, CommandInteraction } from 'discord.js';

import request from '../lib/request';
import { HA_TOKEN, BASE_HA_URL, lightKeywords } from '../lib/conf';
import { DiscordCommand, HAEntity, HAStates } from '../../types';

const status: DiscordCommand = {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Gives a quick overview of the house state'),
  execute: async (interaction: CommandInteraction) => {
    await interaction.deferReply();

    const response: HAEntity[] = await request.get({
      url: `${BASE_HA_URL}/api/states`,
      token: HA_TOKEN,
    });

    if (response) {
      const states: HAStates[] = [];
      for (const entity of response) {
        if (entity.state !== 'unknown') {
          console.log(entity);
        }
        // get light status
        // these are grouped in HA and start with the words in the array
        if (
          lightKeywords.some((keyword) =>
            entity.entity_id.startsWith(keyword)
          ) &&
          entity.attributes.entity_id
        ) {
          states.push({
            entity: entity.entity_id,
            entityStatus: entity.state,
            name:
              typeof entity.attributes.friendly_name === 'string'
                ? entity.attributes.friendly_name
                : `Unknown device: ${entity.entity_id}`,
          });
          // alarm state
        } else if (entity.entity_id.startsWith('alarm_control_panel')) {
          states.push({
            entity: entity.entity_id,
            entityStatus: entity.state,
            name: 'Alarm',
          });
        }
      }

      const reply: string = states
        .map(({ name, entityStatus }) => `${name}: ${entityStatus}\n`)
        .reduce((prev, next) => prev.concat(next));

      interaction.editReply(
        reply ? `${reply}` : `No data from HA. Something's broke :(`
      );
    } else {
      interaction.editReply('Something went wrong! No response from HA');
    }
  },
};

export { status };
