import { logs, NodeSDK, tracing } from '@opentelemetry/sdk-node';
import pino from 'pino';

const sdk = new NodeSDK({
  spanProcessor: new tracing.SimpleSpanProcessor(
    new tracing.ConsoleSpanExporter(),
  ),
  logRecordProcessor: new logs.SimpleLogRecordProcessor(
    new logs.ConsoleLogRecordExporter(),
  ),
});

sdk.start();

process.on('SIGTERM', () => {
  sdk
    .shutdown()
    .then(() => logger.info('Opentelemetry Tracing terminated'))
    .catch((error) =>
      logger.error('Error terminating Opentelemetry Tracing', error),
    )
    .finally(() => process.exit(0));
});

const logger = pino({
  timestamp: () => `,"@timestamp":"${new Date().toISOString()}"`,
  formatters: {
    level: (label) => ({ level: label.toUpperCase() }),
  },
});

export default logger;
