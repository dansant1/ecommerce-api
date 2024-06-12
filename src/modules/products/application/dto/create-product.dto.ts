import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

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
    readonly picture: string;
}
