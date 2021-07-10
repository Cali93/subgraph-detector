import { NotifificationStatus } from '../notify/notify.service';

export interface Config {
  nest: NestConfig;
  theGraphNetwork: TheGraphNetworkConfig;
  discord: DiscordConfig;
}

export interface NestConfig {
  port: number;
}

export interface TheGraphNetworkConfig {
  apiUrl: string;
}
export interface DiscordConfig {
  botToken: string;
  channelId: string;
  notifyOn: NotifificationStatus[]
}

