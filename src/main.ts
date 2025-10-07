import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ aktifin CORS
  app.enableCors({
    origin: true, // ganti sesuai frontend lu
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000); // backend jalan di port 3001 misalnya
}
bootstrap();

