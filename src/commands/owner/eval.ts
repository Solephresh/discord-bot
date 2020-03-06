import { Command, Argument } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import { inspect } from 'util';
const fetch = require('node-fetch');

export default class extends Command {
    constructor() {
        super('eval', {
            aliases: ['eval', 'ev'],
            args: [
                {
                    id: 'input',
                    match: 'text'
                },
                {
                    id: 'async',
                    match: 'flag',
                    prefix: ['--async', '-a'],
                    description: 'Run in asyncronous mode.',
                },
                {
                    id: 'depth',
                    match: 'prefix',
                    prefix: ['--depth='],
                    type: 'number',
                    default: 0
                }
            ],
            category: 'owner'
        });
    }

    public async exec(message: Message, args: any) {
        if (!['328983966650728448', '572523833790038018'].includes(message.author.id)) return;
        let input = args.input;
        if (input.startsWith('\`\`\`js') || input.startsWith('\`\`\`') && input.endsWith('\`\`\`')) {
            input = input.replace(/`/gi, '')
                .replace(/js/gi, '');
        }
        try {
            let evaled;
            if (args.async) {
                evaled = await eval(`(async() => { ${input} })()`)
            } else {
                evaled = await eval(input);
            }
            let evaluation = inspect(evaled, { depth: args.depth });
            let dataType = Array.isArray(evaled) ? "Array<" : typeof evaled, dataTypes: string[] | string[] = [];
            if (~dataType.indexOf("<")) {
                // @ts-ignore
                evaled.forEach(d => {
                    if (~dataTypes.indexOf(Array.isArray(d) ? "Array" : typeof d)) return;
                    dataTypes.push(Array.isArray(d) ? "Array" : typeof d);
                });
                dataType += dataTypes.map(s => s[0].toUpperCase() + s.slice(1)).join(", ") + ">";
            }
            if (evaluation.length >= 1000) {
                const url = (await this.client.ext.uploadToHastebin(evaluation)).url;
                return message.channel.send(url);
            }
            return await message.channel.send(`Done: \`\`\`js\n${evaluation}\`\`\`\n`);
            //[**Type**]\n\`\`\`js\n${dataType}\`\`\`
        } catch (e) {
            const regex = /\[\d+m/gmi;
            return await message.channel.send(`Error: \`\`\`js\n${e.message.replace(regex, '')}\`\`\``);
        }
    }
}