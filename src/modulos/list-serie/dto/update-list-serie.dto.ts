import { PartialType } from '@nestjs/mapped-types';
import { CreateListSerieDto } from './create-list-serie.dto';

export class UpdateListSerieDto extends PartialType(CreateListSerieDto) {}
