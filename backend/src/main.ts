import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //use ValidationPipes to apply input validation into each route handler via dto's class-validator (rules defined)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true, // Si le body contient des propriétés non déclarées dans les dtos la requete est rejeté avec code 422
    forbidUnknownValues: true, //dans le body si la valeur de la clé n'est pas attendue ou si l'objet est vide il lève une erreur
    transform: true,
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    disableErrorMessages: process.env.NODE_ENV === 'production',
  }));

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? 3000;
  await app.listen(port ?? 3000);
}
bootstrap();
