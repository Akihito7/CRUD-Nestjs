import { Body, Controller, Get, Param, Post, Patch, Put } from "@nestjs/common";

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
    async registerFood(@Body() body) {
        return body;
    }

    @Patch()
    async updatePartialFood(@Body() body) {
        return body;
    }

    @Put()
    async updateFood(@Body() body) {
        return body;
    }


}