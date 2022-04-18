import 'reflect-metadata';
import { environment } from '@common/config/environment';
import gracefulShutdown from 'http-graceful-shutdown';
import { logger } from '@common/utils';
import { app, showBanner } from './app';

app.listen(environment.port, () => {
  showBanner();
});

gracefulShutdown(app, {
  finally: () => {
    logger.info('Server gracefully shut down!');
  }
});
