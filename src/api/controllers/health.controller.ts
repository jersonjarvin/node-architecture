import { Request, Response } from 'express';
import { controller, httpGet, Controller } from 'inversify-express-utils';
import { BaseController } from '@common/controllers';
import { HealthStatus } from '@common/model/health-status';

@controller('/health')
export class HealthController extends BaseController implements Controller {
  constructor() {
    super();
  }
  @httpGet('/')
  public async get(req: Request, res: Response) {
    this.ok(res, new HealthStatus('ALIVE', `healthy 😎 !`));
  }
}
