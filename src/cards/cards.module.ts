import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardController } from './cards.controller';
import { Card, CardSchema } from './cards.schema';
import { CardService } from './cards.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
  ],
  providers: [CardService],
  controllers: [CardController],
})
export class CardModule {}
