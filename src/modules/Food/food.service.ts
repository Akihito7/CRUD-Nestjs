import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../Prisma/prisma.service";
import { CreateFoodDTO } from "./dtos/create-food.dto";
import { UpdateFoodDTO } from "./dtos/update-food.dto";
import { UpdatePartialFoodDTO } from "./dtos/update-partial-food.dto";

@Injectable()
export class FoodService {


    constructor(private readonly prismaService: PrismaService) { }

    async getUniqueFood(id: number) {
        return this.prismaService.food.findUnique({ where: { id } })
    }

    async getManyFood() {
        return this.prismaService.food.findMany();
    }

    async registerFood(data: CreateFoodDTO) {
        try {
            return this.prismaService.food.create({ data })
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async updateFood(id: number, data: UpdateFoodDTO) {

        if (!await this.foodExists(id)) throw new NotFoundException("Food não encontrada!");

        data.name = data.name ? data.name : "";
        data.description = data.description ? data.description : ""
        data.value = data.value ? data.value : 0

        return this.prismaService.food.update({
            data,
            where: { id }
        })
    }

    async updatePartialFood(id: number, data: UpdatePartialFoodDTO) {

        if (!await this.foodExists(id)) throw new NotFoundException(id);

        return await this.prismaService.food.update({
            data,
            where: { id }
        })


    }

    async deleteFood(id: number) {
        if (!await this.foodExists(id)) throw new NotFoundException("Food não encontrada!");
        return this.prismaService.food.delete({ where: { id } })
    }

    async foodExists(id: number) {
        return this.prismaService.food.count({ where: { id } })

    }
}