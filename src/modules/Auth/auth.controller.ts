import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthRegisterDTO } from "./dtos/auth-register.dto";

@Controller("auth")
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post("login")
    async login(@Body() body) {
        return this.authService.createToken(body.id)
    }

    @Post("register")
    async register(@Body() body: AuthRegisterDTO) {
        return this.authService.register(body)
    }

}