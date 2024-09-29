import { Expose, Transform } from 'class-transformer';

export class Matchup {
  @Expose()
  starters!: string[];

  @Expose()
  roster_id!: number;

  @Expose()
  players!: string[];

  @Expose()
  matchup_id!: number;

  @Expose()
  @Transform(({ value }) => value.toFixed(2), { toClassOnly: true })
  points!: string;

  @Expose()
  @Transform(({ value }) => value.map((num: number) => num.toFixed(2)), { toClassOnly: true })
  starters_points!: string[];
}
