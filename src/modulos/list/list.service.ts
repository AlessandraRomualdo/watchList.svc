import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ListEntity } from './list.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { isUUID } from 'class-validator';
import { ListMovieEntity } from '../list-movie/list-movie.entity';
import { ApiResponse } from '../../types/response.dto';

export interface ListWithTotalMovies {
  name: string;
  user: UserEntity;
  totalMovies: number;
}

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(ListEntity)
    private readonly listRepository: Repository<ListEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ListMovieEntity)
    private readonly listMovieRepository: Repository<ListMovieEntity>,
  ) {}

  // metodo para criar uma lista de filmes para um usuário
  async create(createListDto: CreateListDto): Promise<ApiResponse<ListEntity>> {
    const user = await this.userRepository.findOne({
      where: { id: createListDto.userId },
    });
    if (!user) return { message: 'Usuário não encontrado' };
    const list = new ListEntity();
    list.name = createListDto.name;
    list.user = user.id as any;
    await this.listRepository.save(list);
    return { success: true, data: list };
  }

  // metodo para listar todas as listas de filmes cadastradas no sistema
  async findAll(): Promise<ApiResponse<ListEntity[]>> {
    const list = await this.listRepository.find();
    if (!list) return { message: 'Nenhuma lista encontrada' };
    return { success: true, data: list };
  }

  // metodo para listar todos os filmes de uma lista de filmes cadastrada no sistema
  async findOne(id: string): Promise<ApiResponse<ListWithTotalMovies>> {
    const list = await this.listRepository.findOne({
      where: { id },
      relations: ['user', 'listMovies'],
    });
    if (!list) return { message: 'List not found' };
    const { listMovies, ...listWithoutMovies } = list;
    return {
      success: true,
      data: { ...listWithoutMovies, totalMovies: listMovies.length },
    };
  }

  // metodo para listar todas as listas de filmes de um usuário cadastradas no sistema
  async findUserLists(
    userId: string,
  ): Promise<ApiResponse<ListWithTotalMovies[]>> {
    if (!isUUID(userId)) {
      throw new BadRequestException('ID inválido');
    }
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['lists', 'lists.listMovies'],
    });
    if (!user) return { message: 'Usuário não encontrado' };
    const lists = user.lists.map((list) => {
      const { listMovies, ...listWithoutMovies } = list;
      return { ...listWithoutMovies, totalMovies: listMovies.length };
    });
    return { success: true, data: lists };
  }

  // metodo para atualizar uma lista de filmes cadastrada no sistema
  async update(
    id: string,
    updateListDto: UpdateListDto,
  ): Promise<ApiResponse<ListEntity>> {
    const list = await this.listRepository.findOne({ where: { id } });
    if (!list) return { message: 'Lista não encontrada' };
    Object.assign(list, updateListDto);
    const saveList = await this.listRepository.save(list);
    return { success: true, data: saveList };
  }

  // metodo para remover uma lista de filmes cadastrada no sistema
  async remove(id: string): Promise<ApiResponse<ListEntity>> {
    const list = await this.listRepository.findOne({ where: { id } });
    if (!list) return { message: 'Lista não encontrada' };
    await this.listRepository.remove(list);
    return { success: true, data: list };
  }
}
