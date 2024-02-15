import { PartialType } from "@nestjs/mapped-types";
import { AuthUpdateDTO } from "./auth-update.dto";

export class AuthUpdatePartialDTO extends PartialType(AuthUpdateDTO) { }