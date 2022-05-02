import { status } from './commands/status';
import { MyCommand } from './types';
import { alarm } from './commands/alarm';
import { lights } from './commands/lights';
import { ping } from './commands/ping';

export const Commands: MyCommand[] = [alarm, lights, ping, status];
