import { Body, Controller, Patch, Post, Put, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthRegisterDTO } from "./dtos/auth-register.dto";
import { AuthLoginDTO } from "./dtos/auth-login.dto";
import { AuthUpdateDTO } from "./dtos/auth-update.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { AuthUpdatePartialDTO } from "./dtos/auth-updatePartial.dto";

@Controller("auth")
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post("login")
    async login(@Body() body: AuthLoginDTO) {
        return this.authService.login(body)
    }

    @Post("register")
    async register(@Body() body: AuthRegisterDTO) {
        return this.authService.register(body)
    }


    @UseGuards(AuthGuard)
    @Put()
    async update(@Body() body : AuthUpdateDTO, @Req() req) {
        console.log(req.user)
        return this.authService.update(body, req.user);
    }

    @UseGuards(AuthGuard)
    @Patch()
    async updatePartial(@Body() body: AuthUpdatePartialDTO, @Req() req) {
        return this.authService.updatePartial(body, req.user)
    }

}