import { Controller, Get, Post, Param, Delete, Req } from '@nestjs/common';
import { Request } from 'express';

import { HeroesService } from './heroes.service';

import { CreateFavoriteHeroDto } from './dto/create-favorite-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';

@Controller('heroes')
export class HeroesController {
  constructor(private readonly heroesService: HeroesService) {}

  @Get()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findAll(@Req() req: Request) {
    const { per_page, page } = req.query;
    return this.heroesService.findAll(Number(per_page), Number(page));
  }

  @Post('/favorite/:id')
  create(@Param('id') id: number) {
    return this.heroesService.create(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.heroesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.heroesService.remove(+id);
  }
}
