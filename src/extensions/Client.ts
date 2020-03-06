import { CoronaClient } from "../structures/CoronaClient";
import Logger from "@ayanaware/logger";

const client = new CoronaClient({
  disableEveryone: true,
  fetchAllMembers: false
});
Logger.get(CoronaClient).info(`Starting virus with ${process.env.DEVELOPMENT ? 'DEVELOPMENT' : 'PRODUCTION'}`);
client.start(process.env.DEVELOPEMTN ? client.config.tokens.development : client.config.tokens.production);