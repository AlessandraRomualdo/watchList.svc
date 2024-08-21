import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListSerieDto } from './dto/create-list-serie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ListSerieEntity } from './list-serie.entity';
import { Repository } from 'typeorm';
import { ListEntity } from '../list/list.entity';
import { SerieEntity } from '../serie/serie.entity';
import { ApiResponse } from 'src/types/response.dto';

@Injectable()
export class ListSerieService {
  constructor(
    @InjectRepository(ListSerieEntity)
    private readonly listSerieRepository: Repository<ListSerieEntity>,
    @InjectRepository(ListEntity)
    private readonly listRepository: Repository<ListEntity>,
    @InjectRepository(SerieEntity)
    private readonly serieRepository: Repository<SerieEntity>,
  ) {}

  // metodo para adicionar uma serie a uma lista de series
  async addSerieAtList(
    createListSerieDto: CreateListSerieDto,
  ): Promise<ApiResponse<ListSerieEntity>> {
    const list = await this.listRepository.findOne({
      where: { id: createListSerieDto.listId },
    });
    if (!list) new NotFoundException('Lista não encontrada');
    const serie = await this.serieRepository.findOne({
      where: { id: createListSerieDto.serieId },
    });
    if (!serie) new NotFoundException('Serie não encontrada');
    const listSerie = new ListSerieEntity();
    listSerie.list = list;
    listSerie.serie = serie.id as any;

    await this.listSerieRepository.save(listSerie);
    return { success: true, data: listSerie };
  }

  // metodo para listar todas as series de uma lista
  async findAllMovieAtList(
    listId: string,
  ): Promise<ApiResponse<ListSerieEntity[]>> {
    const listSeries = await this.listSerieRepository.find({
      where: { list: { id: listId } },
      relations: ['serie'],
    });
    if (!listSeries) return { message: 'Nenhuma serie encontrada na lista' };
    return { success: true, data: listSeries };
  }

  // metodo para remover uma serie de uma lista
  async removeSerieAtList(
    listId: string,
    serieId: string,
  ): Promise<ApiResponse<ListSerieEntity>> {
    const listSerie = await this.listSerieRepository.findOne({
      where: { list: { id: listId }, serie: { id: serieId } },
    });
    if (!listSerie) new NotFoundException('Serie não encontrada na lista');
    await this.listSerieRepository.remove(listSerie);
    return { success: true, data: listSerie };
  }
}
