import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('users')
export class UsersController {
    constructor( private readonly usersService: UsersService ) {}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
      return this.usersService.findById(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body('username') username: string,
        @Body('password') password: string,
    ) {
        return this.usersService.update(id, username, password);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }

}