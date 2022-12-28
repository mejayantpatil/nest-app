import { Controller, Get, Post, Req } from "@nestjs/common";
import { UserService } from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private userService: UserService) {}

    @Get()
    getAllUsers() {
        return this.userService.getAll();
    }

    @Post()
    createUser(@Req() req) {
        return this.userService.create(req.body);
    }

}