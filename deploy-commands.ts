import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

import { Commands } from './commands';
import { appId, guildId, token } from './config.json';

const commands: unknown[] = [];

for (const command of Commands) {
  commands.push(command.data.toJSON());
  console.log(command.data);
}

const rest = new REST({ version: '9' }).setToken(token);

rest
  .put(Routes.applicationGuildCommands(appId, guildId), {
    body: commands,
  })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);
