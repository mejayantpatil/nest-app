import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersController } from "./users.controller";
import { User, UserSchema } from "./users.schema";
import { UserService } from "./users.service";


@Module({
    imports:[MongooseModule.forFeature([{ name: User.name, schema: UserSchema}])],
    providers: [UserService],
    controllers: [UsersController]
})
export class UserModule {}