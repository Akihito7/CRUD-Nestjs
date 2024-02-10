import { IsNumber, IsOptional, IsString } from "@nestjs/class-validator";


export class UpdateFoodDTO {

    @IsOptional()
    @IsString()
    name: string;
    
    @IsOptional()
    @IsString()
    description: string;
    
    @IsOptional()
    @IsNumber()
    value: number;
}