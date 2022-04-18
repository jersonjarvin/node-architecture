import * as model from '@domain/entities';
export interface ProductContract {
  getById(id: number): Promise<model.ProductEntity>;
  getAll(): Promise<model.ProductEntity[]>;
}
