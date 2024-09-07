import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardService } from './cards.service';
import { CardController } from './cards.controller';
import { Card, CardSchema } from './interface/cards.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ 
        name: Card.name, 
        schema: CardSchema 
    }]),
    HttpModule,
  ],

  providers: [CardService],
  controllers: [CardController],

})

export class CardsModule {}