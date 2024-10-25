import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => {
      // Custom error response format when validation fails
      const messages = errors.map((error) => ({
        field: error.property,
        message: Object.values(error.constraints).join('. ') + '.',
      }));
      return new BadRequestException({ errors: messages });
    },
  }));

  // Enable CORS
  app.enableCors();

  // Uncomment this if you want to enable Swagger
  //
  const config = new DocumentBuilder()
    .setTitle('Task Daily Data API')
    .setDescription('API to retrieve user billing data based on ID card')
    .setVersion('1.0')
    .addBearerAuth(    // Add Bearer token authentication
      {
        type: 'http',
        scheme: 'bearer',
      },
      'access-token' // Name of the security scheme
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);


  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
