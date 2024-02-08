import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt"

@Module({
    imports : [JwtModule.register({ secret: '6=\D5FG@b.F@&aEJMhINT+uah^c+]0:<'})],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}