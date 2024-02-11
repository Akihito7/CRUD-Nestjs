import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { request } from "http";
import { AuthService } from "src/modules/Auth/auth.service";
import { PrismaService } from "src/modules/Prisma/prisma.service";


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly authService: AuthService,
        private readonly prismaService: PrismaService
    ) { }

    async canActivate(context: ExecutionContext) {

        const request = context.switchToHttp().getRequest();

        const token = context.switchToHttp().getRequest().headers.authorization;

        let { sub: id } = this.authService.verifyToken(token);
        
        id = Number(id)
        
        const user = await this.prismaService.users.findUnique({ where: { id } });

        request.user = user;

        return true;

    }
}