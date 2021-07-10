import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './configs/config';
import { NotifyModule } from './notify/notify.module';

@Module({
  imports: [HttpModule, NotifyModule, ConfigModule.forRoot({ isGlobal: true, load: [config] }),],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
