import {
    Command,
    Argument
} from 'discord-akairo';
import {
    Message,
    TextChannel,
    MessageEmbed
} from 'discord.js';
import {
    promisify
} from 'util';
import * as pidusage from 'pidusage';
import {
    freemem,
    totalmem
} from 'os';

export default class extends Command {
    constructor() {
        super('all', {
            aliases: ['all'],
            category: 'virus',
            description: 'Get all statistics of COVID-19'
        });
    }

    public async exec(message: Message, args: any) {
        const res = await require('node-fetch')('https://corona.lmao.ninja/all');
        const data = await res.json();

        message.channel.send(
            new MessageEmbed()
            .setColor(this.client.color)
            .setAuthor(`COVID-19 Global`)
            .setFooter('COVID-19 realtime statistics')
            .addFields([{
                    name: 'Cases',
                    value: country.cases,
                    inline: true
                },
                {
                    name: 'Deaths',
                    value: country.deaths,
                    inline: true
                },
                {
                    name: 'Recovered',
                    value: country.recovered,
                    inline: true
                },
            ]));
    }
}
