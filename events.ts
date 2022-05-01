import { MyEvent } from './types';
import { ready } from './events/ready';
import { interactionCreate } from './events/interactionCreate';

export const Events: MyEvent[] = [ready, interactionCreate];
