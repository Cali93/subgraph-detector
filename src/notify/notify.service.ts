import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Discord from 'discord.js';
import { DiscordConfig } from '../configs/config.interface';

export type NotifificationStatus = | 'DEPLOYED' | 'UPDATED' | 'DELETED'
@Injectable()
export class NotifyService {
  discordClient: Discord.Client;
  constructor(private config: ConfigService) {
    const { botToken } = this.config.get<DiscordConfig>('discord');
    const discordClient = new Discord.Client();
    this.discordClient = discordClient;
    this.discordClient.on("ready", () => {
      console.log(`Logged in as ${this.discordClient.user.tag}!`)
    })
    this.discordClient.login(botToken);
  }

  public async notifyOnDiscordCuratorsChannel(diffs: Record<string, any>[], options: {
    status: NotifificationStatus
  }) {
    const { channelId } = this.config.get<DiscordConfig>('discord');
    const channel = this.discordClient.channels.cache.get(channelId);
    const embed = new Discord.MessageEmbed()
      .setTitle('Alert !')
      .setColor(options.status === 'DEPLOYED' ? '#42f560' : options.status === 'UPDATED' ? '#f5e342' : '#ff3b3b')
      .setDescription(`Subgraph ${options.status}`)
      .addFields(diffs.map(diff => Object.entries((diff)).map(([key, value]) => ({
        name: key,
        value: typeof value !== "object" ? value : this.codeBlock('json', JSON.stringify(value)),
        inline: typeof value !== "object"
      }))).flat())
    if (channel?.isText()) { return channel.send(embed) }
  }

  private codeBlock(
    language:
      | "asciidoc"
      | "autohotkey"
      | "bash"
      | "coffeescript"
      | "cpp"
      | "cs"
      | "css"
      | "diff"
      | "fix"
      | "glsl"
      | "ini"
      | "json"
      | "md"
      | "ml"
      | "prolog"
      | "py"
      | "tex"
      | "xl"
      | "xml",
    code: string,
  ) {
    return `\`\`\`${language}\n${code}\`\`\``;
  }
}
