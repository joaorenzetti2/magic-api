import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardsModule } from './cards/cards.module';
import { AuthModule } from './users/auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/MTG-API'), 
    CardsModule,    
    AuthModule,     
    UsersModule,    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}