import { IsArray, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;
  @IsString()
  brand: string;
  @IsArray({ each: true })
  @IsString()
  images: string[];
}
