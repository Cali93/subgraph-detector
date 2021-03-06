import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Discord from 'discord.js';
import stringify from 'json-stringify-pretty-compact';
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

  public async notifyOnDiscordCuratorsChannel(diff: Record<string, any>, options: {
    status: NotifificationStatus
  }) {
    const { channelId } = this.config.get<DiscordConfig>('discord');
    const channel = this.discordClient.channels.cache.get(channelId);
    const embed = new Discord.MessageEmbed()
      .setTitle('Alert !')
      .setColor(options.status === 'DEPLOYED' ? '#42f560' : options.status === 'UPDATED' ? '#f5e342' : '#ff3b3b')
      .setDescription(`Subgraph ${options.status}`)
      .addFields(Object.entries(diff).map(([key, value]) => ({
        name: key,
        value: typeof value !== "object" ? value || "" : this.codeBlock('json', stringify(value)),
        inline: typeof value !== "object"
      })))
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
