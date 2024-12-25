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
  constructor(
    private prisma: PrismaService,
    // @InjectRepository(Blog)
    // private readonly blogRepository: Repository<Blog>,
  ) {}

  async findAll() {
    const findAll = await this.prisma.blog.findMany();
    // console.log(findAll[1]);
    if (!findAll) throw new BadRequestException({ error: 'Data Not Found' });
    return {
      status: HttpStatus.OK,
      messsage: 'Data fetch successfully',
      result: findAll,
    };
  }
  // async create(createProductDto: CreateBlogDto) {
  //   const petsDetails = this.prisma.blog.create({
  //     ...createProductDto,
  //     imageurl: createProductDto.imageurl
  //       ? `http://localhost:3000/images/${createProductDto.imageurl}`
  //       : null,
  //   });
  //   await this.prisma.blog.findMany.save(petsDetails);
  //   return {
  //     msg: 'Data Added successfully',
  //     status: HttpStatus.OK,
  //     data: petsDetails,
  //   };
  // }
  async create(createBlogDto: CreateBlogDto) {
    // Xử lý imageUrl nếu tồn tại
    const imageUrl = createBlogDto.imageurl
      ? `http://localhost:3000/images/${createBlogDto.imageurl}`
      : null;

    // Tạo Blog trong database
    const blog = await this.prisma.blog.create({
      data: {
        title: createBlogDto.title,
        text: createBlogDto.text,
        heading: createBlogDto.heading,
        content: createBlogDto.content,
        imageUrl: imageUrl, // Trường imageUrl có thể null
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
  // async update(id: string, updateBlogDto: UpdateBlogDto) {
  //   const blog = await this.blogRepository.findOne({ where: { id } });

  //   if (!blog) {
  //     throw new NotFoundException(`Blog with id ${id} not found`);
  //   }
  //   console.log('updateBlogDto', updateBlogDto);
  //   // Cập nhật thông tin blog
  //   Object.assign(blog, {
  //     ...updateBlogDto,
  //     imageurl: updateBlogDto.imageurl
  //       ? `http://localhost:3000/images/${updateBlogDto.imageurl}`
  //       : blog.imageurl, // Giữ nguyên `imageurl` nếu không được cung cấp
  //   });

  //   // Lưu thay đổi
  //   const updatedBlog = await this.blogRepository.save(blog);
  //   console.log(updatedBlog);
  //   return {
  //     msg: 'Data updated successfully',
  //     status: HttpStatus.OK,
  //     data: updatedBlog,
  //   };
  // }
}
