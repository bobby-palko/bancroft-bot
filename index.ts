/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Client, Intents } from 'discord.js';
import { Events } from './events';
import { token } from './config.json';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

for (const event of Events) {
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(token);
