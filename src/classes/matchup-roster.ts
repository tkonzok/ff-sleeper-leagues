import { Expose } from 'class-transformer';
import { SleeperPlayer } from './sleeper-player';

export class MatchupRoster {
  @Expose()
  rosterId!: number;

  @Expose()
  points!: string;

  @Expose()
  players!: (SleeperPlayer | undefined)[];

  @Expose()
  playersPoints!: string[];
}
