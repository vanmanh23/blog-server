import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateBlogDto } from './dto/createBlog.dto';
import * as Multer from 'multer';
import { multerOptions } from 'src/constants/multer.config';
import { UpdateBlogDto } from './dto/updateBlog.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async findAll() {
    const findAll: any = await this.blogService.findAll();
    return findAll;
  }
  @Post('create')
  @UseInterceptors(FileInterceptor('imageurl', multerOptions))
  async createBlog(
    @Body()
    blogData: CreateBlogDto,
    @UploadedFile() file: Multer.File,
  ) {
    if (!file) {
      throw new Error('Empty file');
    }
    const uploadResult = file.path;
    const blog = { ...blogData, imageurl: uploadResult };
    return this.blogService.create(blog);
  }
  @Delete('/remove/:id')
  async deleteBlog(@Param('id') id: string) {
    return this.blogService.remove(id);
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  uploadFile(@UploadedFile() file: Multer.File) {
    return {
      url: file.path, // URL ảnh được upload
      public_id: file.filename, // ID ảnh trên Cloudinary
    };
  }
  @Patch('update/:id')
  @UseInterceptors(FileInterceptor('imageurl', multerOptions))
  async updateBlog(
    @Param('id') id: string,
    @Body() blogData: UpdateBlogDto,
    @UploadedFile() file?: Multer.File,
  ) {
    const updatedBlogData = { ...blogData };

    // Nếu có file mới được upload
    if (file) {
      const uploadResult = file.path; // URL ảnh trên Cloudinary
      updatedBlogData.imageurl = uploadResult;
    }

    // Gọi service để cập nhật blog
    return this.blogService.update(id, updatedBlogData);
  }
}
