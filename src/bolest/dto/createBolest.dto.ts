import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateBolestDto {
  @MaxLength(20, { message: 'Naziv bolesti može sadržavati najviše 20 znakova' })
  @MinLength(3, { message: 'Naziv bolesti mora sadržavati najmanje 3 znaka' })
  @IsString({ message: 'Naziv bolesti mora biti niz znakova' })
  naziv!: string;
}
