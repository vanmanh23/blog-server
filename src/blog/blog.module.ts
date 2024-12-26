import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { PrismaModule } from 'src/PrismaClient/prisma.module';
import { CloudinaryProvider } from 'src/constants/CloudinaryProvider ';
import { CloudinaryService } from 'src/constants/CloudinaryService';

@Module({
  imports: [PrismaModule],
  providers: [BlogService, CloudinaryProvider, CloudinaryService],
  controllers: [BlogController],
})
export class BlogModule {}
