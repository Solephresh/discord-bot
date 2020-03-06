import { Command, Argument } from 'discord-akairo';
import { Message, TextChannel } from 'discord.js';
import { inspect } from 'util';

export default class extends Command {
  constructor() {
    super('reload', {
      aliases: ['reload', 'r'],
      args: [
        {
          id: 'id',
          match: "word"
        },
        {
          id: 'all',
          match: 'flag',
          prefix: ['--all', '-a'],
          description: 'Reload all',
        },
        {
          id: 'inhibitors',
          match: 'flag',
          prefix: ['--inhibitors', '-i'],
          description: 'Reload all',
        },
        {
          id: 'listeners',
          match: 'flag',
          prefix: ['--listeners', '-l'],
          description: 'Reload all',
        },
        {
          id: 'commands',
          match: 'flag',
          prefix: ['--commands', '-c'],
          description: 'Reload all',
        },
        {
          id: 'load',
          match: 'flag',
          prefix: ['--load='],
          type: 'string',
          default: null
        }
      ],
      category: 'owner'
    });
  }

  public async exec(message: Message, args: any) {
    if (!['328983966650728448', '572523833790038018'].includes(message.author.id)) return;
    try {
      if (args.all) {
        const msg = await message.channel.send('Reloading commands, inhibitors, and listeners.');
        const start = Date.now();
        this.client.commandHandler.removeAll();
        this.client.listenerHandler.removeAll();
        this.client.commandHandler.loadAll();
        this.client.listenerHandler.loadAll();
        const end = Date.now();
        return msg.edit(`Reloaded **everything I could find** in **${require('ms')(end - start)}**`);

      }
      // if (args.inhibitors) {
      //   const msg = await message.channel.send('Reloading inhibitors.');
      //   const start = Date.now();
      //   const inh = await this.client.inhibitorHandler.reloadAll();
      //   const end = Date.now();
      //   return msg.edit(`Reloaded in ${require('ms')(end - start)}:\n    Commands:\n        0\n    Listeners:\n        0\n    Inhibitors:\n        ${inh.modules.size}`);
      // }
      if (args.listeners) {
        const msg = await message.channel.send('Reloading listeners.');
        const start = Date.now();
        this.client.listenerHandler.removeAll();
        this.client.listenerHandler.loadAll();
        const end = Date.now();
        return msg.edit(`Reloaded **listeners/** in **${require('ms')(end - start)}**`);
      }
      if (args.commands) {
        const msg = await message.channel.send('Reloading commands.');
        const start = Date.now();
        this.client.commandHandler.removeAll();
        this.client.commandHandler.loadAll();
        const end = Date.now();
        return msg.edit(`Reloaded **commands/** in **${require('ms')(end - start)}**`);
      }
    } catch (e) {
      const regex = /\[\d+m/gmi;
      return await message.channel.send(`Error: \`\`\`js\n${e.message.replace(regex, '')}\`\`\``);
    }
  }
}
