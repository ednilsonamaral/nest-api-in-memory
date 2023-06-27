import { ForbiddenException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs';
import * as md5 from 'md5';

import { UpdateHeroDto } from './dto/update-hero.dto';

@Injectable()
export class HeroesService {
  private baseUrl: string;
  private publicKey: string;
  private privateKey: string;

  constructor(private httpService: HttpService) {
    this.baseUrl = 'http://gateway.marvel.com/v1/public';
    this.publicKey = 'fd517ea42bbb13835a6f9f83110df0a8';
    this.privateKey = 'b0e0fd34731f3075b0878adf7e77f14a2f4c3f02';
  }

  private getCurrentDate() {
    const currentDate = Number(new Date());
    return currentDate;
  }

  private generateHash() {
    const hash = md5(this.getCurrentDate() + this.privateKey + this.publicKey);
    return hash;
  }

  async findAll(per_page?: number, page?: number) {
    const params: any = {
      ts: this.getCurrentDate(),
      apikey: this.publicKey,
      hash: this.generateHash(),
      limit: per_page || 100,
      offset: page - 1,
    };

    const response = this.httpService
      .get(`${this.baseUrl}/characters`, {
        params,
      })
      .pipe(
        map(async (res) => {
          const { count, limit, total, results } = res.data.data;

          const heroes = await results.map((h: any) => ({
            marvelId: h.id,
            name: h.name,
            description: h.description,
            uri: h.resourceURI,
          }));

          return {
            offset: page,
            count,
            limit,
            total,
            data: heroes,
          };
        }),
      )
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );

    return response;
  }

  async create(id: number) {
    return {
      data: id,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} hero`;
  }

  remove(id: number) {
    return `This action removes a #${id} hero`;
  }
}
