import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthTokenDTO } from "./dtos/auth-token.dto";
import { AuthRegisterDTO } from "./dtos/auth-register.dto";
import { PrismaService } from "../Prisma/prisma.service";
import { AuthLoginDTO } from "./dtos/auth-login.dto";
import { AuthUpdateDTO } from "./dtos/auth-update.dto";
import { hash, compare } from 'bcrypt';
import { users } from "@prisma/client";
import { AuthUpdatePartialDTO } from "./dtos/auth-updatePartial.dto";


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

        if (await this.prismaService.users.count({ where: { email: data.email } })) throw new UnauthorizedException("E-mail já em uso!");

        data.password = await hash(data.password, 8);

        return this.prismaService.users.create({ data })

    }

    async login(data: AuthLoginDTO) {
        const user = await this.prismaService.users.findFirst({
            where: {
                email: data.email
            }
        })

        if (!user) throw new NotFoundException("E-mail e ou senha incorretos!")

        if (!await compare(data.password, user.password)) throw new NotFoundException("E-mail e ou senha incorretos!")

        const token = await this.createToken(user.id);

        return { user, token }
    }

    async update(data: AuthUpdateDTO, user: users) {
        
        const userMatchPassword = await this.prismaService.users.findUnique({ where: { id: user.id } });

        if (!await compare(data.itsmePassword, userMatchPassword.password)) throw new ForbiddenException("Senha incorreta");

        data.name = data.name ? data.name : "";
        data.email = data.email ? data.email : "";
        data.birthday_at = data.birthday_at ? data.birthday_at : null
        data.password = data.password ? await hash(data.password, 8) : user.password

        const { itsmePassword, ...rest } = data;

        return this.prismaService.users.update({
            where: { id: user.id },
            data: rest
        })
    }
    

    async updatePartial(data: AuthUpdatePartialDTO, user: users) {

        const userMatchPassword = await this.prismaService.users.findUnique({ where: { id: user.id } });

        if (!await compare(data.itsmePassword, userMatchPassword.password)) throw new ForbiddenException("Senha incorreta");

        data.password = data.password ? await hash(data.password, 8) : user.password

        const { itsmePassword, ...rest } = data;

        return this.prismaService.users.update({
            where: { id: user.id },
            data : rest,
        })
    }
}   