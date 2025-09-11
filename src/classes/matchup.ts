import { Expose, Transform } from 'class-transformer';

export class Matchup {
  @Expose()
  starters!: string[];

  @Expose({ name: 'roster_id' })
  rosterId!: number;

  @Expose()
  players!: string[];

  @Expose({ name: 'matchup_id' })
  matchupId!: number;

  @Expose()
  @Transform(({ value }) => value.toFixed(2), { toClassOnly: true })
  points!: string;

  @Expose({ name: 'starters_points' })
  @Transform(({ value }) => value.map((num: number) => num.toFixed(2)), { toClassOnly: true })
  startersPoints!: string[];

  @Expose({ name: 'players_points' })
  playersPoints!: Record<string, number>;
}
