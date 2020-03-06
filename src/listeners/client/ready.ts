import { Listener } from 'discord-akairo';
import Logger from '@ayanaware/logger';

export default class extends Listener {
  constructor() {
    super('ready', {
      emitter: 'client',
      eventName: 'ready',
    });
  }
  async exec() {
    Logger.get('Events.READY').info(`Ready as ${this.client.user.tag}`);
  }
}