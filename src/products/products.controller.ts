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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './products.service';
import readXlsxFile from 'read-excel-file/node';
import { FileInterceptor } from '@nestjs/platform-express';
import { backupPath } from 'src/main';
import * as fs from 'fs';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductService) { }

  @Get()
  async getProducts() {
    return this.productService
      .findAll()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return { message: 'No Products available.' };
      });
  }

  @Get('/lowQuantity')
  async getProductsWithLowQuantity() {
    return this.productService
      .findAll()
      .then((res) => {
        return res.filter((p) => {
          return p.quantity < 10;
        });
      })
      .catch((err) => {
        console.log(err);
        return { message: 'No Products available.' };
      });
  }

  @Get('/category/:category')
  async getProductsByCategory(@Param('category') category = '') {
    return this.productService
      .findAll()
      .then((res) => {
        return res.filter((r) => r.category === category);
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
  }

  @Post()
  async createProduct(@Body() productDTO: any) {
    return this.productService
      .create(productDTO)
      .then((res) => {
        return { mesage: 'Done' };
      })
      .catch((err) => {
        console.log(err);
        return {
          mesage: 'Cant create product.',
        };
      });
  }

  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() productDTO: any) {
    return await this.productService
      .update(id, productDTO)
      .then((res) => {
        return {
          mesage: 'Updated',
        };
      })
      .catch((err) => {
        console.log(err);
        return {
          mesage: 'Cant update product.',
        };
      });
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productService
      .delete(id)
      .then((res) => {
        return {
          mesage: 'Deleted',
        };
      })
      .catch((err) => {
        console.log(err);
        return {
          mesage: 'Cant Delete product.',
        };
      });
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    const arry: any[] = [];
    await readXlsxFile(file.buffer).then((rows) => {
      rows.map((row, index) => {
        index > 0 &&
          arry.push({
            partNumber: row[0],
            partName: row[1],
            saleRate: row[2],
            quantity: row[3],
            unit: row[4],
            category: row[5],
            storeLocation: row[6],
            ledgerPageNumber: row[7],
          });
      });
    });
    return this.productService.upload(arry);
  }

  @Post('backup')
  async getBackup(@Res() response) {
    return this.productService.findAll().then(async (res) => {
      let result = '';
      if (!fs.existsSync(backupPath)) {
        fs.mkdirSync(backupPath, { recursive: true });
      }
      await fs.writeFile(
        backupPath +
        '/products-backup-' +
        new Date().toISOString().substring(0, 10) +
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
