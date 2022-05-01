import { Client } from 'discord.js';
import { MyEvent } from '../types';

const ready: MyEvent = {
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

export { ready };
