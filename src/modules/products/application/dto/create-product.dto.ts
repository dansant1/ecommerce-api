import { IsString, IsNotEmpty, IsNumber, IsPositive, IsOptional } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly sku: string;   

    @IsNumber()
    @IsPositive()
    readonly price: number; 

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    readonly picture?: string;
}
