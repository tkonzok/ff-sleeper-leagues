import { Expose, Transform, Type } from 'class-transformer';

export class LeagueSettings {
  @Expose({ name: 'best_ball' })
  @Transform(({ value }) => !!value, { toClassOnly: true })
  bestBall!: boolean;
}

export class League {
  @Expose() name!: string;
  @Expose() status!: string;
  @Expose() avatar!: string;
  @Expose() season!: string;
  @Expose({ name: 'draft_id' }) draftId!: string;
  @Expose({ name: 'league_id' }) leagueId!: string;
  @Expose({ name: 'roster_positions' }) rosterPositions!: string[];
  @Expose({ name: 'total_rosters' }) totalRosters!: number;

  @Expose()
  @Type(() => LeagueSettings)
  settings!: LeagueSettings;
}
