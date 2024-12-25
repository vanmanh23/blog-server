import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  text: string;

  @IsString()
  heading: string;

  @IsString()
  content: string;

  @IsString()
  imageurl: string;
}
