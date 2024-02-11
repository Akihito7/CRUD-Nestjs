import { Module } from "@nestjs/common";

import { FoodController } from "./food.controller";
import { FoodService } from "./food.service";
import { PrismaModule } from "../Prisma/prisma.module";
import { AuthModule } from "../Auth/auth.module";

@Module({
    imports : [PrismaModule, AuthModule],
    controllers: [FoodController],
    providers: [FoodService],
})
export class FoodModule { }