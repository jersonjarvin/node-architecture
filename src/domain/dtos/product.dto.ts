import { IsNotEmpty } from 'class-validator';

export class ProductReqDto {
  @IsNotEmpty({ message: 'id is required' })
  code?: string;
}

export class ProductResDto {
  id?: number;
  name?: string;
  desc?: string;
  type?: string;
  banner?: string;
  unit?: number;
  price?: number;
  available?: boolean;
  suplier?: string;
}
