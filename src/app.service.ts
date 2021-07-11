import { HttpService, Injectable } from '@nestjs/common';
import { Observable, timer } from 'rxjs';
import { switchMap, distinctUntilChanged, retryWhen, delay, take } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import isEqual from 'lodash.isequal';
import differenceWith from 'lodash.differencewith';
import { NotifyService } from './notify/notify.service';
import { GET_SUBGRAPHS, GET_SUBGRAPHS_VERSIONS } from './graphql/queries';
import { ConfigService } from '@nestjs/config';
import { DiscordConfig, TheGraphNetworkConfig } from './configs/config.interface';

@Injectable()
export class AppService {
  constructor(private config: ConfigService, private httpService: HttpService, private notify: NotifyService) { }
  private theGraphNetworkApi({
    endpoint,
    method = 'POST',
    body,
  }: {
    endpoint: string;
    method?: 'POST';
    body?: {
      query: string;
      variables?: Record<string, any>;
    };
  }): Observable<AxiosResponse<any>> {

    return this.httpService.request({
      baseURL: this.config.get<TheGraphNetworkConfig>('theGraphNetwork').apiUrl,
      url: endpoint,
      method,
      data: body
    });
  }

  public pollLatestSubgraphs() {
    console.log('Polling...');
    const interval = 15000;
    let currentSubgraphs = [];
    return timer(0, interval).pipe(
      switchMap((_) =>
        this.theGraphNetworkApi({
          endpoint: '/',
          body: {
            query: GET_SUBGRAPHS_VERSIONS // Replace with GET_SUBGRAPHS for more updates
          }
        }).pipe(
          retryWhen(e$ => e$.pipe(
              // try again after 5 seconds
              delay(5000),
              // stop trying after 10 times
              take(9)
          )
          // still keep the observable alive if
          // the first 10 times fail
          // catchError(e => of(e))
      )
      )
    )).pipe(distinctUntilChanged((prev, curr) => {
      return isEqual(prev.data?.data?.subgraphs, curr.data?.data?.subgraphs);
    })).subscribe(async data => {
      const { subgraphs } = data.data.data;
      // don't notify when the bot starts
      if (currentSubgraphs.length === 0) {
        currentSubgraphs.push(...subgraphs);
      }
      if (subgraphs) {
        const diff = differenceWith(currentSubgraphs, subgraphs, isEqual);
        console.log({inDiff: false, diff, currentSubgraphsCount: currentSubgraphs.length, subgraphsCount: subgraphs.length });
        if (diff.length > 0) {
          const status = currentSubgraphs.every(currSub =>
            subgraphs.map(sub => sub.id).includes(currSub.id))
              ? 'UPDATED'
              : currentSubgraphs.length < subgraphs.length
                ? 'DEPLOYED'
                : 'DELETED' ;
          console.log({status});
          if (this.config.get<DiscordConfig>('discord').notifyOn.includes(status)){
            await this.notify.notifyOnDiscordCuratorsChannel(diff, {
              status
            });
          }
          console.log({ inDiff: true, currentSubgraphsCount: currentSubgraphs.length, subgraphsCount: subgraphs.length });
          currentSubgraphs = subgraphs;
        }
      }
    })
  }
}
