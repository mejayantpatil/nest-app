import { Injectable } from "@nestjs/common/decorators";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDTO } from "./user.dto";
import { User, UserDocument } from "./users.schema";


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

    async create(UserDTO: UserDTO): Promise<User> {
        return await this.userModel.create(UserDTO);
    }

    async getAll(): Promise<User[]> {
        return await this.userModel.find().exec()
    } 
}