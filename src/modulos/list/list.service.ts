import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ListEntity } from './list.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { isUUID } from 'class-validator';
import { ListMovieEntity } from '../list-movie/list-movie.entity';

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

  async create(createListDto: CreateListDto) {
    const user = await this.userRepository.findOne({
      where: { id: createListDto.userId },
    });
    if (!user) return { message: 'Usuário não encontrado' };
    const list = new ListEntity();
    list.name = createListDto.name;
    list.user = user.id as any;
    return await this.listRepository.save(list);
  }

  async findAll() {
    return await this.listRepository.find();
  }

  async findOne(id: string) {
    const list = await this.listRepository.findOne({
      where: { id },
      relations: ['user', 'listMovies'],
    });
    const totalMovies = list.listMovies.length;
    return { ...list, totalMovies };
  }

  async findUserLists(userId: string) {
    if (!isUUID(userId)) {
      throw new BadRequestException('ID inválido');
    }
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['lists'],
    });
    if (!user) return { message: 'Usuário não encontrado' };
    return user.lists;
  }

  async update(id: string, updateListDto: UpdateListDto) {
    const list = await this.listRepository.findOne({ where: { id } });
    if (!list) return;
    Object.assign(list, updateListDto);
    return await this.listRepository.save(list);
  }

  async remove(id: string) {
    const list = await this.listRepository.findOne({ where: { id } });
    if (!list) return;
    await this.listRepository.remove(list);
    return { message: 'Lista removida com sucesso', list };
  }
}
