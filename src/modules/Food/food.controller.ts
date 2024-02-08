import { Body, Controller, Get, Param, Post, Patch, Put, ParseIntPipe } from "@nestjs/common";
import { CreateFoodDTO } from "./dtos/create-food.dto";
import { UpdatePartialFoodDTO } from "./dtos/update-partial-food.dto";
import { UpdateFoodDTO } from "./dtos/update-food.dto";

@Controller("food")
export class FoodController {

    @Get("")
    async findManyFood() {
        return "Hello, path find many food"
    }

    @Get(":id")
    async findUniqueFood(@Param("id") id) {
        return `Hello, path find unique food ${id}`
    }

    @Post()
    async registerFood(@Body() body: CreateFoodDTO) {
        return body;
    }

    @Patch(":id")
    async updatePartialFood(@Param("id", ParseIntPipe) id,
        @Body() body: UpdatePartialFoodDTO
    ) {
        return body;
    }

    @Put(":id")
    async updateFood(@Param("id", ParseIntPipe) id,
        @Body() body : UpdateFoodDTO) {
        return body;
    }

}