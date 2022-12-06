import { Client } from 'discord.js';
import { DiscordEvent } from '../../types';

const ready: DiscordEvent = {
  name: 'ready',
  once: true,
  execute: (client: Client) => {
    console.log(
      `Ready! Logged in as ${
        client.user?.tag || 'uhhh...I forget. Something is wrong :('
      }`
    );
  },
};

export default ready;
