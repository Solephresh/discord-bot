import Logger from "@ayanaware/logger"

process.on('unhandledRejection', (e: Error) => {
  console.log(e);
  Logger.get(e.name).error(e.message.replace('\n', ', '));
});