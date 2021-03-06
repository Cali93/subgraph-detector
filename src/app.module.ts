import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppService } from './app.service';
import config from './configs/config';
import { NotifyModule } from './notify/notify.module';

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 10,
    }),
    NotifyModule,
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
  ],
  providers: [AppService, ConfigService],
})
export class AppModule { }
