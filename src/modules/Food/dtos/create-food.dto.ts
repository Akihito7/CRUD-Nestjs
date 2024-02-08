import { IsString, IsNumber} from "@nestjs/class-validator"

export class CreateFoodDTO {
    
    @IsString()
    name : string;

    @IsString()
    description : string;

    @IsNumber()
    value : number;
}