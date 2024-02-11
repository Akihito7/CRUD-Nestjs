import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "src/enums/roles.enum";


@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext) {

        const requiredRoles = this.reflector.getAllAndOverride("roles", [context.getHandler(), context.getClass()])

        const { user } = context.switchToHttp().getRequest();

        const allowAcess = requiredRoles.filter((role: Role) => role === user.role)

        return allowAcess > 0;
    }
}