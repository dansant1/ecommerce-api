import { IsNotEmpty, IsString, IsNumber, IsArray, ArrayNotEmpty, ArrayMinSize } from 'class-validator';

export class CreateOrderDto {
    @IsNotEmpty()
    @IsString()
    clientName: string; 

    @IsNotEmpty()
    @IsNumber()
    total: number;  
    
    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    productList: string[];
}
