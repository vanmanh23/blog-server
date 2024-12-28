import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { Options } from 'multer';

type CustomParams = Options & {
  folder: string;
};

export const multerOptions = {
  storage: new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'user-uploads', // Tên folder trên Cloudinary
      allowed_formats: [
        'jpg',
        'png',
        'jpeg',
        'gif',
        'webp',
        'tif',
        'tiff',
        'avif',
      ], // Các định dạng cho phép
    } as CustomParams,
  }),
};
