import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { config } from 'dotenv';
config();
@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost', // Replace with your host
    //   port: 5433, // Default PostgreSQL port
    //   username: 'postgres', // Your PostgreSQL username
    //   password: '123456789', // Your PostgreSQL password
    //   database: 'blogsdb', // Your PostgreSQL database name
    //   autoLoadEntities: true, // Automatically load entities
    //   synchronize: true, // Auto-sync schema in development (disable in production)
    // }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   url: 'postgresql://neondb_owner:VtRS71yxmbgT@ep-nameless-truth-a5i4aj1g.us-east-2.aws.neon.tech/neondb?sslmode=require',
    // }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Thư mục gốc chứa ảnh
      serveRoot: '/images', // URL truy cập (http://localhost:3000/images)
      serveStaticOptions: {
        index: false, // Prevent looking for index.html
      },
    }),
    UserModule,
    BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
