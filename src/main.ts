import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { AppModule } from './app.module';
import {
  LOGGER_LEVELS,
  LOGGER_DATE_FORMAT,
  LOGGER_LABEL,
  LOGGER_COLORS,
} from './common/logger/constants';

winston.addColors(LOGGER_COLORS);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      level: global.loglevel || LOGGER_LEVELS.INFO,
      format: winston.format.combine(
        winston.format.timestamp({ format: LOGGER_DATE_FORMAT }),
        winston.format.colorize({ all: true }),
        winston.format.label({ label: LOGGER_LABEL }),
        winston.format.printf(info => {
          return `${info.timestamp} [${info.label}] ${info.level}: ${info.message};`;
        }),
      ),
      transports: [new winston.transports.Console({})],
    }),
  });

  app.enableCors({
    origin: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
