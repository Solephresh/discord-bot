import { CoronaClient } from "./CoronaClient";
import { Guild } from "../entities";
import { createConnection, Connection } from "typeorm";
import Logger from "@ayanaware/logger";
export class Ext {
  public client: CoronaClient;
  constructor(client: CoronaClient) {
    this.client = client;
  }
  public async initializeORM(config) {
    this.client.orm = {
      connection: await createConnection(config)
    };
    if (this.client.orm.connection.isConnected) Logger.get(Connection).info(`Successfully initialized postgres`)
    this.client.orm.repos = {
      guild: this.client.orm.connection.getRepository(Guild)
    };
  }
  public async guild(id: string) {
    let guild = await this.client.orm.repos.guild.findOne({ id });
    if (!guild) {
      await this.client.orm.repos.guild.save(new Guild().set({ id }));
      guild = await this.client.orm.repos.guild.findOne({ id });
    };
    return guild;
  }
  public async uploadToHastebin(body: string) {
    const res = await require('node-fetch')(`https://bin.lunasrv.com/documents`, {
      body,
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
      }
    });
    const json = await res.json();
    return {
      key: json.key,
      url: `https://bin.lunasrv.com/${json.key}`
    }
  }
}
