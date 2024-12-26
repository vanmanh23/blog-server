import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
// import { BlogInterface } from './blog.interface';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Blog } from './blog.entity';
import { CreateBlogDto } from './dto/createBlog.dto';
// import { UpdateBlogDto } from './dto/updateBlog.dto';
import { PrismaService } from 'src/PrismaClient/prisma.service';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const findAll = await this.prisma.blog.findMany();
    if (!findAll) throw new BadRequestException({ error: 'Data Not Found' });
    return {
      status: HttpStatus.OK,
      messsage: 'Data fetch successfully',
      result: findAll,
    };
  }
  async create(createBlogDto: CreateBlogDto) {
    const blog = await this.prisma.blog.create({
      data: {
        title: createBlogDto.title,
        text: createBlogDto.text,
        heading: createBlogDto.heading,
        content: createBlogDto.content,
        imageUrl: createBlogDto.imageurl,
      },
    });

    // Trả về kết quả
    return {
      msg: 'Data added successfully',
      status: HttpStatus.OK,
      data: blog,
    };
  }
  // async remove(id: string) {
  //   const deleteData = await this.blogRepository.delete(id);
  //   return {
  //     msg: 'Data Deleted successfully',
  //     status: HttpStatus.OK,
  //     data: deleteData,
  //   };
  // }
  async remove(id: string) {
    const deleteData = await this.prisma.blog.delete({ where: { id } });
    return {
      msg: 'Data Deleted successfully',
      status: HttpStatus.OK,
      data: deleteData,
    };
  }
  async findBlogById(id: string) {
    const blog = await this.prisma.blog.findUnique({ where: { id } });
    return blog;
  }
  async update(id: string, updatedBlogData: any) {
    const blog = await this.findBlogById(id);
    if (!blog) {
      throw new Error('Blog not found');
    }
    const updatedBlog = await this.prisma.blog.update({
      where: { id },
      data: {
        title: updatedBlogData.title,
        text: updatedBlogData.text,
        heading: updatedBlogData.heading,
        content: updatedBlogData.content,
        imageUrl: updatedBlogData.imageurl,
      },
    });

    return updatedBlog;
  }
}
