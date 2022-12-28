import { Controller, Get, Post, Req } from "@nestjs/common";
import { CatsService } from "./cats.service";
import { Cat } from "./schemas/cats.schema";


@Controller('cats')
export class CatsController {
    constructor(private catService: CatsService) {}
    @Get()
    getAll():Promise<Cat[]> {
        return this.catService.findAll();
    }
    @Post()
    create(@Req() req): Promise<Cat> {
        return this.catService.create(req.body)
    }
}