import { Injectable } from '@nestjs/common';
import { CreateSerieDto } from './dto/create-serie.dto';
import { UpdateSerieDto } from './dto/update-serie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SerieEntity } from './serie.entity';
import { Repository } from 'typeorm';
import { GenderEntity } from '../gender/gender.entity';
import { ApiResponse } from 'src/types/response.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class SerieService {
  constructor(
    @InjectRepository(SerieEntity)
    private readonly serieRepository: Repository<SerieEntity>,
    @InjectRepository(GenderEntity)
    private readonly genderRepository: Repository<GenderEntity>,
  ) {}

  // metodo para criar uma serie
  async create(
    createSerieDto: CreateSerieDto,
  ): Promise<ApiResponse<CreateSerieDto>> {
    const gender = await this.genderRepository.findOne({
      where: { id: createSerieDto.genderId },
    });
    if (!gender) throw new Error('Gênero não encontrado');
    const serie = new SerieEntity();
    serie.title = createSerieDto.title;
    serie.description = createSerieDto.description;
    serie.poster = createSerieDto.poster;
    serie.seasons = createSerieDto.seasons;
    serie.gender = gender;
    await this.serieRepository.save(serie);
    return { success: true, data: createSerieDto };
  }

  // metodo para listar todas as series cadastradas no sistema
  async findAll(
    title?: string, // filtro opcional
    gender?: string, // filtro opcional
    orderBy: 'asc' | 'desc' = 'asc', // ordenação opcional
  ): Promise<ApiResponse<SerieEntity[]>> {
    const queryBuilder = this.serieRepository.createQueryBuilder('serie');
    // Adiciona relação com o gênero
    queryBuilder.leftJoinAndSelect('serie.gender', 'gender');
    // Filtro por título, se fornecido
    if (title) {
      queryBuilder.andWhere('LOWER(serie.title) LIKE LOWER(:title)', {
        title: `%${title}%`,
      });
    }
    // Filtro por gênero, se fornecido
    if (gender) {
      queryBuilder.andWhere('gender.gender = :gender', { gender });
    }
    // Ordenação
    if (orderBy) {
      const sortOrder = orderBy === 'desc' ? 'DESC' : 'ASC';
      queryBuilder.orderBy('serie.title', sortOrder);
    }
    const series = await queryBuilder.getMany();
    if (!series) throw new Error('Nenhuma serie encontrada');
    return { success: true, data: series };
    // const series = await this.serieRepository.find({
    //   relations: {
    //     gender: true,
    //   },
    // });
    // if (!series) throw new Error('Nenhuma serie encontrada');
    // return { success: true, data: series };
  }

  // metodo para listar todas as series cadastradas no sistema por gênero
  async findAllByGender(gender: string): Promise<ApiResponse<SerieEntity[]>> {
    const series = await this.serieRepository.find({
      relations: { gender: true },
      where: { gender: { gender } },
    });
    if (!series) throw new Error('Nenhuma serie encontrada');
    return { success: true, data: series };
  }

  // metodo para pesquisar uma serie pelo nome
  async findByTitle(title: string): Promise<ApiResponse<SerieEntity[]>> {
    const serie = await this.serieRepository
      .createQueryBuilder('serie')
      .where('LOWER(serie.title) LIKE LOWER(:title)', { title: `%${title}%` })
      .getMany();
    if (!serie) throw new Error('Nenhuma serie encontrada');
    return { success: true, data: serie };
  }

  // metodo para listar uma serie cadastrada no sistema pelo id
  async findOne(id: string): Promise<ApiResponse<SerieEntity>> {
    if (!isUUID(id)) {
      throw new Error('Id inválido');
    }
    const serie = await this.serieRepository.findOne({
      where: { id },
      relations: { gender: true },
    });
    if (!serie) throw new Error('Nenhuma serie encontrada');
    return { success: true, data: serie };
  }

  // metodo para atualizar uma serie cadastrada no sistema pelo id
  async update(
    id: string,
    updateSerieDto: UpdateSerieDto,
  ): Promise<ApiResponse<SerieEntity>> {
    if (!isUUID(id)) {
      throw new Error('Id inválido');
    }
    const serie = await this.serieRepository.findOne({
      where: { id },
      relations: { gender: true },
    });
    if (!serie) throw new Error('Nenhuma serie encontrada');
    Object.assign(serie, updateSerieDto);
    await this.serieRepository.save(serie);
    return { success: true, data: serie };
  }

  // metodo para remover uma serie cadastrada no sistema pelo id
  async remove(id: string): Promise<ApiResponse<SerieEntity>> {
    if (!isUUID(id)) {
      throw new Error('Id inválido');
    }
    const serie = await this.serieRepository.findOne({
      where: { id },
      relations: { gender: true },
    });
    if (!serie) throw new Error('Nenhuma serie encontrada');
    const removedSerie = await this.serieRepository.remove(serie);
    return { success: true, data: removedSerie };
  }
}
