import * as dotenv from 'dotenv';
import { Config } from './config.interface';
dotenv.config()
const config: Config = {
  nest: {
    port: 3000,
  },
  theGraphNetwork:{
    apiUrl: process.env.THE_GRAPH_NETWORK_API_URL
  },
  discord: {
    botToken: process.env.DISCORD_BOT_TOKEN,
    channelId: process.env.DISCORD_CHANNEL_ID,
    notifyOn: [
      'DEPLOYED',
      // TODO: improve updated flow (show exact diff, etc)
      'UPDATED',
      // 'DELETED'
    ]
  }
};

export default (): Config => config;
