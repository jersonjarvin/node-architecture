import { inject, injectable } from 'inversify';
import { TYPES } from '@common/constants';
import Sql from '@common/utils/sql';
import * as IRepository from '@domain/interfaces/repository';
import * as IService from '@domain/interfaces/services';
import * as dto from '@domain/dtos';
import { plainToInstance } from 'class-transformer';

@injectable()
export class ProductService implements IService.ProductContract {
  constructor(
    @inject(TYPES.Sql) private sql: Sql,
    @inject(TYPES.ProducRepository) private productRepository: IRepository.ProductContract
  ) {}
  async getById(id: number): Promise<dto.ProductResDto> {
    const data = await this.productRepository.getById(id);
    const result = plainToInstance(dto.ProductResDto, data);
    return result;
  }
  async getAll(): Promise<dto.ProductResDto[]> {
    const data = await this.productRepository.getAll();
    const result = plainToInstance(dto.ProductResDto, data);
    return result;
  }
}
