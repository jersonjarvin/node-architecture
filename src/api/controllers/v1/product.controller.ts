import { Request, Response } from 'express';
import { controller, httpGet, Controller } from 'inversify-express-utils';
import { BaseController } from '@common/controllers';
import { inject } from 'inversify';
import { TYPES } from '@common/constants';
import * as IService from '@domain/interfaces/services';

@controller('/products')
export class ProductController extends BaseController implements Controller {
  constructor(@inject(TYPES.ProductService) private productService: IService.ProductContract) {
    super();
  }
  @httpGet('/')
  public async getAll(req: Request, res: Response) {
    const result = await this.productService.getAll();
    this.ok(res, result);
  }

  @httpGet('/test2')
  public async get(req: Request, res: Response) {
    const result = await this.productService.getById(1);
    this.ok(res, result);
  }
}
