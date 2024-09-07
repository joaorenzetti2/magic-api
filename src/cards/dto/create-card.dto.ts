import { IsString, IsNotEmpty, IsArray } from "class-validator";
import { isArrayBuffer } from "util/types";

export class createCardDto {
    @IsString()
    @IsNotEmpty({ message: 'O nome do card é obrigatório' })
    name: String;

    @IsString()
    @IsNotEmpty({ message: 'A descrição do card é obrigatória' })
    description: String;

    @IsArray()
    tags: String[];
}