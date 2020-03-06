import { Command, Argument } from 'discord-akairo';
import { Message, TextChannel, MessageEmbed } from 'discord.js';

export default class extends Command {
  constructor() {
    super('help', {
      aliases: ['help', 'commands'],
      category: 'general',
      description: 'Get all commands',
      args: [
        {
          id: 'command',
          type: 'command',
          default: null
        }
      ]
    });
  }

  public async exec(message: Message, args: any) {
    if (!args.command) {
      const embed = new MessageEmbed()
        .setColor(this.client.color)
        .setTitle('Commands')
        .setThumbnail(this.client.user.displayAvatarURL())
        .setDescription('COVID-19 is a **pandemic** sweeping across nations wiping out communites, there have been over **90K** people who have been infected with COVID-19 and could rise up.')
        //@ts-ignore
        .setFooter(`Use "${this.client.akairoOptions.prefix()}help <command name>" to get more info on a command.`);

      for (const [category, commands] of this.handler.categories) {
        const title = {
          system: 'System',
          general: 'System',
          virus: 'Virus'
        }[category];

        const publicCommands = message.author.id === this.client.ownerID && !false
          ? commands
          : commands.filter(c => !c.ownerOnly);
        let parentCommands = publicCommands.filter(c => Boolean(c.aliases && c.aliases.length));

        //@ts-ignore
        if (!message.guild) parentCommands = parentCommands.filter(c => c.channel !== 'guild');
        if (title && parentCommands.size)
          embed.addFields({ name: title, value: parentCommands.map(c => `\`${c.aliases[0]}\``).join(', ') });
      }

      return message.channel.send(embed);
    }
    if (args.command) {
      const embed = new MessageEmbed()
        .setColor(this.client.color)
        .setTitle('Commands :: ' + args.command.id)
        .setDescription(args.command.description)
        .addFields({ name: 'Aliases', value: args.command.aliases.filter(c => c !== args.command.id).join(', ') })
        .setFooter(`Viewing extra detail for ${args.command.id}`);
      message.channel.send(embed);
    }
  }
}

