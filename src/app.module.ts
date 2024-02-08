import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodModule } from './modules/Food/food.module';
import { AuthModule } from './modules/Auth/auth.module';

@Module({
  imports: [FoodModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
