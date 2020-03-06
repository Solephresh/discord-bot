import { Command, Argument } from 'discord-akairo';
import { Message, TextChannel, MessageEmbed } from 'discord.js';
import { promisify } from 'util';
import * as pidusage from 'pidusage';
import { freemem, totalmem } from 'os';

export default class extends Command {
  constructor() {
    super('countrylist', {
      aliases: ['countrylist', 'list', 'ls'],
      category: 'virus',
      description: 'Get all COVID-19 affected countries'
    });
  }

  public async exec(message: Message, args: any) {
    const res = await require('node-fetch')('https://corona.lmao.ninja/countries');
    const data = await res.json();

    message.channel.send(
      new MessageEmbed()
        .setColor(this.client.color)
        .setAuthor(`COVID-19 affected countries`)
        .setFooter('COVID-19 realtime statistics')
        .addFields([
          { name: 'List of affected countries', value: `https://www.worldometers.info/coronavirus/#countries We support all the countries in there!`).join(', ') }
        ])
    );
  }
}

