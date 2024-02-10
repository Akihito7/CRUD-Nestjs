import { Module } from "@nestjs/common";

import { FoodController } from "./food.controller";
import { FoodService } from "./food.service";
import { PrismaModule } from "../Prisma/prisma.module";

@Module({
    imports : [PrismaModule],
    controllers: [FoodController],
    providers: [FoodService],
})
export class FoodModule { }