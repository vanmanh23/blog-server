import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const corsOptions: CorsOptions = {
  origin: [
    'http://localhost:3000',
    'https://blog-server-roan-seven.vercel.app',
    'http://localhost:5173',
    'https://blog-page-ashy-two.vercel.app',
  ],
  methods: ['GET', 'OPTIONS', 'PATCH', 'DELETE', 'POST', 'PUT'],
  allowedHeaders: [
    'X-CSRF-Token',
    'X-Requested-With',
    'Accept',
    'Accept-Version',
    'Content-Length',
    'Content-MD5',
    'Content-Type',
    'Date',
    'X-Api-Version',
    'Authorization',
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};
