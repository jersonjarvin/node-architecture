import * as dto from '@domain/dtos';
export interface ProductContract {
  getById(id: number): Promise<dto.ProductResDto>;
  getAll(): Promise<dto.ProductResDto[]>;
}
