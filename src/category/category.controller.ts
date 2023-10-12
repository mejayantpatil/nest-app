import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { backupPath } from 'src/main';
import * as fs from 'fs';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) { }

  @Get()
  async getCategorys() {
    return this.categoryService
      .findAll()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return { message: 'No Categorys available.' };
      });
  }

  @Post()
  async createCategory(@Body() categoryDTO: any) {
    return this.categoryService
      .create(categoryDTO)
      .then((res) => {
        return { mesage: 'Done' };
      })
      .catch((err) => {
        console.log(err);
        return {
          mesage: 'Cant create category.',
        };
      });
  }

  @Put(':id')
  async updateCategory(@Param('id') id: string, @Body() categoryDTO: any) {
    return await this.categoryService
      .update(id, categoryDTO)
      .then((res) => {
        return {
          mesage: 'Updated',
        };
      })
      .catch((err) => {
        console.log(err);
        return {
          mesage: 'Cant update category.',
        };
      });
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return await this.categoryService
      .delete(id)
      .then((res) => {
        return {
          mesage: 'Deleted',
        };
      })
      .catch((err) => {
        console.log(err);
        return {
          mesage: 'Cant Delete category.',
        };
      });
  }

  @Get(':id')
  async getCategory(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Post('backup')
  async getBackup(@Res() response) {
    return this.categoryService.findAll().then(async (res) => {
      let result = '';
      if (!fs.existsSync(backupPath)) {
        fs.mkdirSync(backupPath, { recursive: true });
      }
      await fs.writeFile(
        backupPath +
        '/category-backup-' +
        // new Date().toISOString().substring(0, 10) +
        '.json',
        JSON.stringify(res),
        (err) => {
          if (err) {
            console.log('Error writing file', err);
            result = 'error while backup.';
            response.json({ message: result });
          } else {
            console.log('Successfully wrote file');
            result = 'backuped successfully.';
            response.json({ message: result });
          }
        },
      );
      return result;
    });
  }
}
