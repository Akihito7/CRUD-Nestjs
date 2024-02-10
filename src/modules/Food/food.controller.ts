import { Body, Controller, Get, Param, Post, Patch, Put, ParseIntPipe, Delete } from "@nestjs/common";
import { CreateFoodDTO } from "./dtos/create-food.dto";
import { UpdatePartialFoodDTO } from "./dtos/update-partial-food.dto";
import { UpdateFoodDTO } from "./dtos/update-food.dto";
import { FoodService } from "./food.service";
import { identity } from "rxjs";

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

    @Post()
    async registerFood(@Body() body: CreateFoodDTO) {
        return this.foodService.registerFood(body);
    }

    @Patch(":id")
    async updatePartialFood(@Param("id", ParseIntPipe) id,
        @Body() body: UpdatePartialFoodDTO
    ) {
        return this.foodService.updatePartialFood(id, body)
    }

    @Put(":id")
    async updateFood(@Param("id", ParseIntPipe) id,
        @Body() body: UpdateFoodDTO) {
        return this.foodService.updateFood(id, body)
    }

    @Delete(":id")
    async deleteFood(@Param("id", ParseIntPipe) id) {
        return this.foodService.deleteFood(id)
    }

}