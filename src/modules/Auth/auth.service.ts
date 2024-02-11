import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthTokenDTO } from "./dtos/auth-token.dto";
import { AuthRegisterDTO } from "./dtos/auth-register.dto";
import { PrismaService } from "../Prisma/prisma.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prismaService: PrismaService
    ) { }

    async createToken(id: number) {
        return this.jwtService.sign({}, {
            issuer: "login",
            audience: "users",
            subject: String(id),
            expiresIn: "7 day"
        });
    }

    verifyToken(token: AuthTokenDTO) {
        try {
            const verifyToken = String(token).split(" ")[1]

            const isValidToken = this.jwtService.verify(verifyToken, {
                issuer: "login",
                audience: "users",
            })

            return isValidToken

        } catch (error) {
            throw new BadRequestException("Token inválido")
        }
    }

    async register(data: AuthRegisterDTO) {
        try {
            if (await this.prismaService.users.count({ where: { email: data.email } })) throw new UnauthorizedException("E-mail já em uso!")

            return this.prismaService.users.create({ data })
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}   