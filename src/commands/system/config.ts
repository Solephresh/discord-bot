import { Command, Argument } from 'discord-akairo';
import { Message, TextChannel, MessageEmbed } from 'discord.js';

export default class extends Command {
  constructor() {
    super('config', {
      aliases: ['config', 'cfg', 'conf', 'settings'],
      category: 'general',
      description: 'Change config',
      args: [
        {
          id: 'raw',
          match: 'rest',
          default: null
        }
      ]
    });
  }

  public async exec(message: Message, args: any) {
    if (message.author.id !== this.client.ownerID) if (!message.guild.member(message.author).hasPermission('MANAGE_GUILD')) return message.channel.send(`🚫 You do not have the correct permissions to run this command, \`Manage Server\``);
    const input: string[] = args.raw ? args.raw.split(' ') : [];
    const guild = await this.client.ext.guild(message.guild.id);
    if (!args.raw) {
      // @ts-ignore
      return message.channel.send(`⚙️ Settings for **${message.guild.name}**\n**COVID-19 Stats Channel** is **${guild.channel ? message.guild.channels.cache.get(guild.channel).toString() : 'None'}** (${this.client.akairoOptions.prefix()}config channel <#channel | name | id>)\n**COVID-19 Stats Type** is **${guild.type ? guild.type : 'all'}** (${this.client.akairoOptions.prefix()}config type <"all" | "Country Name here")\n\n*None of these work at the moment, pl*`)
    }
    if (input[0] === "channel") {
      if (!input[1]) return message.channel.send(`Provide a **channel**, it can be #channel, a name or it's id.`)
      const channel = message.mentions.channels.first() || message.guild.channels.cache.get(input[1]) || message.guild.channels.cache.find(c => c.name === input[1]);
      if (!channel) return message.channel.send(`That channel does not exist.`);
      if (channel.type !== 'text') return message.channel.send(`That channel is not a text channel.`);
      guild.channel = channel.id;
      this.client.orm.repos.guild.save(guild);
      return message.channel.send(`Stats channel has been set to ${channel.toString()}, you will recieve updates there.`);
    } else if (input[0] === 'type') {
      if (!input[1]) return message.channel.send(`Provide a **type**, it can be \`all\` to get all stats, or a country name.`)
      guild.type = input[1];
      this.client.orm.repos.guild.save(guild);
      return message.channel.send(`Stats type has been set to \`${guild.type}\`.`);
    }
  }
}

