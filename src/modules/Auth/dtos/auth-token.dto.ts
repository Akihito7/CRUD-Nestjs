import { IsJWT } from "@nestjs/class-validator";

export class AuthTokenDTO {

    @IsJWT()
    token: string;
}