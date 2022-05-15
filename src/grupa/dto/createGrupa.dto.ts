import { IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateGrupaDto {
  
  @MaxLength(20, { message: 'Ime grupe može sadržavati najviše 20 znakova'})
  @MinLength(5, { message: 'Ime grupe mora sadržavati najmanje 5 znakova'})
  @IsString({ message: 'Ime grupe mora biti niz znakova' })
  name!: string;

  @IsNumber({}, { message: 'ID odgajatelja mora biti brojčana vrijednost' })
  odgajateljId!: number;

  @IsOptional()
  @IsNumber({}, { each: true })
  children: number[];
}
