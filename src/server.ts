import initServer from "./app";
import { Config } from "./config";
import logger from "./config/logger";

const startServer = async () => {
  const PORT = Config.PORT || 5501;
  const app = await initServer();
  try {
    app.listen(PORT, () => logger.info(`Listening on port ${PORT}`));
  } catch (err: unknown) {
    if (err instanceof Error) {
      logger.error(err.message);
      logger.on("finish", () => {
        process.exit(1);
      });
    }
  }
};

void startServer();
