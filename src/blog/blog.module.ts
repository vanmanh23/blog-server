import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Blog } from './blog.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PrismaModule } from 'src/PrismaClient/prisma.module';

@Module({
  imports: [
    PrismaModule,
    // TypeOrmModule.forFeature([Blog]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads', // Thư mục lưu ảnh
        filename: (req, file, callback) => {
          const uniqueSuffix = `${Date.now()}-${file.originalname}`;
          callback(null, uniqueSuffix);
        },
      }),
    }),
  ],
  providers: [BlogService],
  controllers: [BlogController],
})
export class BlogModule {}
