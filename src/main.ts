import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const theGraphService = app.select(AppModule).get(AppService, { strict: true });
  theGraphService.pollLatestSubgraphs();
  await app.listen(3000);
}
bootstrap();
