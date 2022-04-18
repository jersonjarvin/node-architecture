import * as IRepository from '@domain/interfaces/repository';
import { injectable } from 'inversify';
import { ProductEntity } from '@domain/entities';
import db from '../database/sampledata.json';

@injectable()
export class ProductRepository implements IRepository.ProductContract {
  async getById(id: number): Promise<ProductEntity> {
    return db.find((m) => m.id === id) as ProductEntity;
  }
  async getAll(): Promise<ProductEntity[]> {
    return db as ProductEntity[];
  }
}
