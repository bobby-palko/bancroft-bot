/* eslint-disable */
import { Client, GatewayIntentBits } from 'discord.js';
import { exit } from 'process';

import { DISCORD_TOKEN } from './lib/conf';
import events from './events';

if (!DISCORD_TOKEN) {
  console.log('No Discord token defined. Aborting!');
  exit(1);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  console.log(`Logged in as ${client?.user?.tag || `unknown user`}!`);
});

for (const event of events) {
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(DISCORD_TOKEN);
