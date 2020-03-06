import { Command, Argument } from 'discord-akairo';
import { Message, TextChannel, MessageEmbed } from 'discord.js';
import { promisify } from 'util';
import * as pidusage from 'pidusage';
import { freemem, totalmem } from 'os';

export default class extends Command {
  constructor() {
    super('country', {
      aliases: ['country'],
      category: 'virus',
      description: 'Get statistics on a country',
      args: [
        { id: 'country', default: null, type: 'string', match: 'rest' }
      ]
    });
  }

  public async exec(message: Message, args: any) {
    const res = await require('node-fetch')('https://corona.lmao.ninja/countries');
    const data = await res.json();

    if (!args.country) return message.channel.send(`Please provide a country!`);
    const country = data.find(c => c.country.toLowerCase() === args.country.toLowerCase());
    if (!country) return message.channel.send(`Country not found, or does not have the disease yet.`);

    message.channel.send(
      new MessageEmbed()
        .setColor(this.client.color)
        .setAuthor(`COVID-19 stats for ${country.country}`)
        .setFooter('COVID-19 realtime statistics')
        .addFields([
          { name: 'Cases', value: country.cases, inline: true },
          { name: 'Deaths', value: country.deaths, inline: true },
          { name: 'Recovered', value: country.recovered, inline: true },
          { name: 'Critical', value: country.critical, inline: true },
          { name: 'Cases Today', value: country.todayCases, inline: true },
          { name: 'Deaths Today', value: country.todayDeaths, inline: true },
        ])
    );
  }
}

