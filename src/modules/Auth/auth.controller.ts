import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {

    constructor(private readonly authService : AuthService) {}

    @Post("login")
    async login(@Body() body){
        return this.authService.createToken(body.id)
    }

    @Post("register")
    async register(){
        return "register"
    }

}