import { PartialType } from '@nestjs/mapped-types';
import { CreateListMovieDto } from './create-list-movie.dto';

export class UpdateListMovieDto extends PartialType(CreateListMovieDto) {}
