import { AkairoClient } from 'discord-akairo';
import { Collection } from 'discord.js';
import { Ext } from './Ext';
import { Repository, Connection } from 'typeorm';
import { Guild } from '../entities';
import { Message } from 'discord.js';

const config = require('../../config.json');

export interface ORMRepos {
  guild?: Repository<Guild>;
}

export interface ORMHandler {
  repos?: ORMRepos;
  connection: Connection;
}


declare module 'discord-akairo' {
  interface AkairoClient {
    ext: Ext;
    color: string;
    config: any;
    orm: ORMHandler | null;
  }
}

export class CoronaClient extends AkairoClient {
  // {
  //   ownerID: '328983966650728448',
  //   handleEdits: true,
  //   allowMention: true,
  //   blockBots: true,
  //   commandUtilLifetime: 120 * 100,
  //   commandDirectory: process.env.RIPTIDE_DEVELOPMENT === "true" ? "./src/commands" : "./out/commands",
  //   listenerDirectory: process.env.RIPTIDE_DEVELOPMENT === "true" ? "./src/listeners" : "./out/listeners",
  // }
  constructor(options) {
    super({
      ownerID: '328983966650728448',
      handleEdits: true,
      allowMention: true,
      blockBots: true,
      commandUtilLifetime: 120 * 100,
      commandDirectory: process.env.DEVELOPMENT === "true" ? "./src/commands" : "./out/commands",
      listenerDirectory: process.env.DEVELOPMENT === "true" ? "./src/listeners" : "./out/listeners",
    }, options);
    //@ts-ignore
    this.akairoOptions.prefix = (message: Message) => {
      return process.env.DEVELOPMENT === "true" ? "covid " : "cov ";
    }
    this.ext = new Ext(this);
    this.ext.initializeORM(process.env.DEVELOPMENT === "true" ? config.orm : config.ormProd);
    this.config = config;
    this.color = '#292dd7';
  }
  public start(token: string) {
    this.login(token);
  }
}