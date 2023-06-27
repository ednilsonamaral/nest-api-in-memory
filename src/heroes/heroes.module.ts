import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { HeroesService } from './heroes.service';
import { HeroesController } from './heroes.controller';

@Module({
  imports: [HttpModule],
  controllers: [HeroesController],
  providers: [HeroesService],
})
export class HeroesModule {}
