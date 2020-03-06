import { Command, Argument } from 'discord-akairo';
import { Message, TextChannel, MessageEmbed } from 'discord.js';
import { promisify } from 'util';
import * as pidusage from 'pidusage';
import { freemem, totalmem } from 'os';

export default class extends Command {
  constructor() {
    super('stats', {
      aliases: ['stats', 'botinfo', 'bi', 'info'],
      category: 'general',
      description: 'View bot statistics'
    });
  }

  public async exec(message: Message, args: any) {
    const pid = promisify(pidusage);
    const stats = await pid(process.pid);
    return message.channel.send(`
**Client**
    **Guilds** ${this.client.guilds.cache.size}
    **Users** ${this.client.users.cache.size}
    **Memory** ${(stats.memory / 1024 / 1024).toFixed(2)}/${(totalmem() / 1024 / 1024).toFixed(2)}
    **CPU** ${stats.cpu.toFixed(2)}%
**System:**
    **Memory** ${(freemem() / 1024 / 1024).toFixed(2)}/${(totalmem() / 1024 / 1024).toFixed(2)}
`);
  }
}

