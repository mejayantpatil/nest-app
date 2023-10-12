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
import { CardService } from './cards.service';
import { backupPath } from 'src/main';
import * as fs from 'fs';

@Controller('cards')
export class CardController {
  constructor(private cardService: CardService) { }

  @Get()
  async getCards() {
    return this.cardService
      .findAll()
      .then((res) => {
        return res[0] ? res[0] : {};
      })
      .catch((err) => {
        console.log(err);
        return { message: 'No Cards available.' };
      });
  }

  @Post()
  async createCard(@Body() cardDTO: any) {
    return this.cardService
      .create(cardDTO)
      .then((res) => {
        return { mesage: 'Done' };
      })
      .catch((err) => {
        console.log(err);
        return {
          mesage: 'Cant create card.',
        };
      });
  }

  @Put(':id')
  async updateCard(@Param('id') id: string, @Body() cardDTO: any) {
    return await this.cardService
      .update(id, cardDTO)
      .then((res) => {
        return {
          mesage: 'Updated',
        };
      })
      .catch((err) => {
        console.log(err);
        return {
          mesage: 'Cant update card.',
        };
      });
  }

  @Delete(':id')
  async deleteCard(@Param('id') id: string) {
    return await this.cardService
      .delete(id)
      .then((res) => {
        return {
          mesage: 'Deleted',
        };
      })
      .catch((err) => {
        console.log(err);
        return {
          mesage: 'Cant Delete card.',
        };
      });
  }

  @Get(':id')
  async getCard(@Param('id') id: string) {
    return this.cardService.findOne(id);
  }
  @Post('backup')
  async getBackup(@Res() response) {
    return this.cardService.findAll().then(async (res) => {
      let result = '';
      if (!fs.existsSync(backupPath)) {
        fs.mkdirSync(backupPath, { recursive: true });
      }
      await fs.writeFile(
        backupPath +
        '/cards-backup-' +
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
