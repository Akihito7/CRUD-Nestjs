import { PartialType } from "@nestjs/mapped-types";
import { UpdateFoodDTO } from "./update-food.dto";

export class UpdatePartialFoodDTO extends PartialType(UpdateFoodDTO) {}