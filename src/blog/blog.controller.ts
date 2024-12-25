import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateBlogDto } from './dto/createBlog.dto';
import * as Multer from 'multer';
// import { UpdateBlogDto } from './dto/updateBlog.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async findAll() {
    const findAll: any = await this.blogService.findAll();
    return findAll;
  }
  @Post('create')
  @UseInterceptors(FileInterceptor('imageurl'))
  async createBlog(
    @Body()
    blogData: CreateBlogDto,
    @UploadedFile() file: Multer.File,
  ) {
    const imageUrl = file ? file.filename : null;
    return this.blogService.create({ ...blogData, imageurl: imageUrl });
  }
  @Delete('/remove/:id')
  async deleteBlog(@Param('id') id: string) {
    return this.blogService.remove(id);
  }

  // @Patch('/update/:id')
  // async updateBlog(
  //   @Param('id') id: string,
  //   @Body() updateBlogDto: UpdateBlogDto,
  // ) {
  //   console.log('id', id);
  //   console.log('test', updateBlogDto);
  //   return this.blogService.update(id, updateBlogDto);
  // }
}
