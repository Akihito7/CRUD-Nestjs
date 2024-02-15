import { IsDateString, IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class AuthUpdateDTO {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 6,
        minLowercase: 0,
        minNumbers: 0,
        minSymbols: 0,
        minUppercase: 0,
    })
    password: string;
    

    @IsStrongPassword({
        minLength: 6,
        minLowercase: 0,
        minNumbers: 0,
        minSymbols: 0,
        minUppercase: 0,
    })

    itsmePassword : string;
    
    @IsOptional()
    @IsDateString()
    birthday_at: string;
}