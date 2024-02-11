import { Body, Controller, Get, Param, Post, Patch, Put, ParseIntPipe, Delete, UseGuards } from "@nestjs/common";
import { CreateFoodDTO } from "./dtos/create-food.dto";
import { UpdatePartialFoodDTO } from "./dtos/update-partial-food.dto";
import { UpdateFoodDTO } from "./dtos/update-food.dto";
import { FoodService } from "./food.service";
import { AuthGuard } from "src/guards/auth.guard";
import { RolesGuard } from "src/guards/roles.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/roles.enum";


@UseGuards(AuthGuard)
@Controller("food")
export class FoodController {

    constructor(private readonly foodService: FoodService) { }

    @Get("")
    async findManyFood() {
        return this.foodService.getManyFood();
    }

    @Get(":id")
    async findUniqueFood(@Param("id", ParseIntPipe) id) {
        return this.foodService.getUniqueFood(id);
    }
     
    @Roles(Role.admin)
    @UseGuards(RolesGuard)
    @Post()
    async registerFood(@Body() body: CreateFoodDTO) {
        return this.foodService.registerFood(body);
    }
    
    @Roles(Role.admin)
    @UseGuards(RolesGuard)
    @Patch(":id")
    async updatePartialFood(@Param("id", ParseIntPipe) id,
        @Body() body: UpdatePartialFoodDTO
    ) {
        return this.foodService.updatePartialFood(id, body)
    }
    
    @Roles(Role.admin)
    @UseGuards(RolesGuard)
    @Put(":id")
    async updateFood(@Param("id", ParseIntPipe) id,
        @Body() body: UpdateFoodDTO) {
        return this.foodService.updateFood(id, body)
    }
    
    @Roles(Role.admin)
    @UseGuards(RolesGuard)
    @Delete(":id")
    async deleteFood(@Param("id", ParseIntPipe) id) {
        return this.foodService.deleteFood(id)
    }

}