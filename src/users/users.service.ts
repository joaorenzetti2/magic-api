import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./schemas/users.schema";
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from './dto/create-user.dto';  // Certifique-se de importar o DTO

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, roles } = createUserDto;
    const existingUser = await this.userModel.findOne({ username }).exec();
    if (existingUser) {
      throw new Error('Nome de usuario em uso');
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ username, password: hashedPassword, roles });
    return newUser.save();
  }
  
  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }

  async findById(id: string): Promise<User | undefined> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userModel.findByIdAndUpdate(id, { username, password: hashedPassword }, { new: true }).exec();
  }

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}