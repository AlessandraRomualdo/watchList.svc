import { PartialType } from '@nestjs/mapped-types';
import { CreateSerieDto } from './create-serie.dto';

export class UpdateSerieDto extends PartialType(CreateSerieDto) {}
