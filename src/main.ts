import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import helmet from 'helmet';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  const theGraphService = app.select(AppModule).get(AppService, { strict: true });
  theGraphService.pollLatestSubgraphs();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
