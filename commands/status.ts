import axios from 'axios';
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { MyCommand, HAEntities, MyStates } from '../types';
import { homeAssistantToken, baseURL } from '../config.json';

const status: MyCommand = {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Gives a quick overview of the house state'),
  execute: async (interaction: CommandInteraction) => {
    await interaction.deferReply();

    const instance = axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${homeAssistantToken}`,
        'content-type': 'application/json',
      },
    });

    await instance
      .get('/api/states')
      .then((res) => {
        const entities = res.data as HAEntities[];
        const states: MyStates[] = [];
        for (const entity of entities) {
          if (entity.state !== 'unknown') {
            console.log(entity);
          }
          // get light status these are grouped in HA and start with the words in the array
          if (
            ['light', 'group'].some((word) =>
              entity.entity_id.startsWith(word)
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
      })
      .catch((e) => {
        interaction.editReply(`Something went wrong: ${e as string}`);
      });
  },
};

export { status };
