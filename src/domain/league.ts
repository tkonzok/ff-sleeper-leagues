import { Expose, Type } from 'class-transformer';

export class LeagueSettings {
  @Expose() best_ball?: number;
}

export class League {
  @Expose() name!: string;
  @Expose() status!: string;
  @Expose() avatar!: string;
  @Expose() season!: string;
  @Expose() draft_id!: string;
  @Expose() league_id!: string;
  @Expose() roster_positions!: string[];
  @Expose() total_rosters!: number;

  @Expose()
  @Type(() => LeagueSettings)
  settings!: LeagueSettings;
}
