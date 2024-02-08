import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    async createToken(id: number) {
        return this.jwtService.sign({}, {
            issuer: "login",
            audience: "users",
            subject: String(id),
            expiresIn: "7 day"
        });
    }
}   