import { Container } from 'inversify';
import { interfaces, TYPE } from 'inversify-express-utils';
import * as controller from '@api/controllers';
import * as services from '@application/services';
import * as repository from '@infrastructure/repository';
import * as IRepository from '@domain/interfaces/repository';
import * as IService from '@domain/interfaces/services';
import { TYPES } from '@common/constants/di-types';
import Sql from '@common/utils/sql';

export class AppContainer {
  container = new Container({
    skipBaseClassChecks: true
  });
  constructor() {
    this.configure();
  }
  configure() {
    this.container.bind<Sql>(TYPES.Sql).to(Sql);
    this.configureServices();
    this.configureRepository();
  }
  configureControllers() {
    (<any>Object).values(controller).map((ctrl: any) => {
      this.container.bind<interfaces.Controller>(TYPE.Controller).to(ctrl).whenTargetNamed(ctrl);
    });
  }
  configureServices() {
    this.container.bind<IService.ProductContract>(TYPES.ProductService).to(services.ProductService);
  }
  configureRepository() {
    this.container.bind<IRepository.ProductContract>(TYPES.ProducRepository).to(repository.ProductRepository);
  }
}
