import { Module } from '@nestjs/common';
// import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';

import { AppController } from './app.controller';

import { AppService } from './app.service';
import { HeroesModule } from './heroes/heroes.module';

@Module({
  // imports: [HttpModule, InMemoryDBModule.forRoot({}), HeroesModule],
  imports: [HeroesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
