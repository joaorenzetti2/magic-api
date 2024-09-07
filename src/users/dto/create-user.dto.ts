import { IsString, IsArray, IsEnum, MinLength, } from "class-validator";
import { Role } from "../roles/roles.enum";

export class CreateUserDto {
    @IsString()
    @MinLength(3, { message: 'Nome de usuário deve ter pelo menos 3 caracteres' })
    username: string;

    @IsString()
    @MinLength(4, { message: 'Senha deve ter no mínimo 4 caracteres' })
    password: string;

    @IsArray()
    @IsEnum(Role, { each: true, message: 'Role não válida' })
    roles: Role[];
}