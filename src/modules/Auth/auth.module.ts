import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt"
import { PrismaModule } from "../Prisma/prisma.module";

@Module({
    imports: [JwtModule.register({ secret: '6=\D5FG@b.F@&aEJMhINT+uah^c+]0:<' }), PrismaModule],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule { }