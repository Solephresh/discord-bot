import * as bodyParser from 'body-parser';
import { Server } from '@overnightjs/core';
import { APIController } from './controllers/APIController';
import { ORMHandler, RiptideClient } from './structures/RiptideClient';
import Logger from '@ayanaware/logger';
import { UserController } from './controllers/UserController';
import { PlayerController } from './controllers/PlayerController';
import { Connection } from 'typeorm';
import { ClientController } from './controllers/ClientController';

export class RiptideAPIClient extends Server {

  constructor(client: RiptideClient) {
    super();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.setupControllers(client);
  }

  private setupControllers(client: RiptideClient): void {
    const api = new APIController().set(client);
    const user = new UserController().set(client);
    const player = new PlayerController().set(client);
    const cclient = new ClientController().set(client);
    super.addControllers([api, user, player, cclient]);
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      Logger.get(RiptideAPIClient).info('Started server on port ' + port);
    })
  }
}