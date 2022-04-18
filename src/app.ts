import express from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import cookieParser from 'cookie-parser';
import { environment } from '@common/config/environment';
import { logger } from '@common/utils';
import dedent from 'ts-dedent';
import figlet from 'figlet';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import yamljs from 'yamljs';
import helmet from 'helmet';
import compression from 'compression';
import { errorHandler, morganMiddleware } from '@api/middlewares';
import { NotFoundException } from '@common/utils/http-exception';
import { AppContainer } from '@common/config';

const container = new AppContainer().container;

const swaggerDocument = yamljs.load('./swagger.yaml');

const server = new InversifyExpressServer(container, null, {
  rootPath: environment.basePath
});

const app = server
  .setConfig((app) => {
    // middlewares
    //app.use(validateHeaders());

    app.use(morganMiddleware());

    // set security HTTP headers
    app.use(helmet());

    // parse json request body
    app.use(express.json());

    // parse urlencoded request body
    app.use(express.urlencoded({ extended: true }));

    // enable cors
    app.use(
      cors({
        origin: '*',
        credentials: false,
        methods: ['GET'],
        allowedHeaders: '*',
        optionsSuccessStatus: 200
      })
    );

    app.use(cookieParser());

    // gzip compression
    app.use(compression());

    app.get('/', (req, res) => res.redirect('swagger'));

    app.use(environment.basePathSwagger, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  })
  .setErrorConfig((app) => {
    app.use((req, res, next) => next(new NotFoundException()));
    // catch 404 and forward to error handler
    app.use(errorHandler);
  })
  .build();

const showBanner = (): void => {
  const banner = dedent`Application started successfully!
       ${figlet.textSync(environment.appName)}
        Name: ${environment.appName}
        Description: ${environment.appDescription}
        Version: ${environment.appVersion}
        Port: ${environment.port}
        Base Path: ${environment.basePath}
        Environment: ${environment.appEnv}
        Copyright © ${new Date().getFullYear()}. All rights reserved.
     `;
  logger.info(banner);
};

export { app, showBanner };
