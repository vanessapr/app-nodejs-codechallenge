import { IsOptional, Min } from 'class-validator';

export class PaginationArgs {
  @IsOptional()
  @Min(1)
  first: number = 50;

  @IsOptional()
  @Min(0)
  offset: number = 0;
}
