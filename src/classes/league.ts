import { Expose, Transform, Type } from 'class-transformer';

export class ScoringSettings {
  @Expose({ name: 'pass_yd' })
  passYd?: number;

  @Expose({ name: 'pass_td' })
  passTd?: number;

  @Expose({ name: 'pass_fd' })
  passFd?: number;

  @Expose({ name: 'pass_2pt' })
  pass2pt?: number;

  @Expose({ name: 'pass_cmp_40p' })
  passCmp40p?: number;

  @Expose({ name: 'pass_int' })
  passInt?: number;

  @Expose({ name: 'pass_int_td' })
  passIntTd?: number;

  @Expose({ name: 'pass_cmp' })
  passCmp?: number;

  @Expose({ name: 'pass_inc' })
  passInc?: number;

  @Expose({ name: 'pass_sack' })
  passSack?: number;

  @Expose({ name: 'rush_yd' })
  rushYd?: number;

  @Expose({ name: 'rush_td' })
  rushTd?: number;

  @Expose({ name: 'rush_fd' })
  rushFd?: number;

  @Expose({ name: 'rush_2pt' })
  rush2pt?: number;

  @Expose()
  rec?: number;

  @Expose({ name: 'rec_yd' })
  recYd?: number;

  @Expose({ name: 'rec_td' })
  recTd?: number;

  @Expose({ name: 'rec_fd' })
  recFd?: number;

  @Expose({ name: 'rec_2pt' })
  rec2pt?: number;

  @Expose({ name: 'bonus_rec_te' })
  bonusRecTe?: number;

  @Expose()
  fum?: number;

  @Expose({ name: 'fum_lost' })
  fumLost?: number;

  @Expose({ name: 'fum_rec_td' })
  fumRecTd?: number;

  @Expose({ name: 'st_td' })
  stTd?: number;

  @Expose({ name: 'st_ff' })
  stFf?: number;

  @Expose({ name: 'st_fum_rec' })
  stFumRec?: number;

  @Expose({ name: 'def_td' })
  defTd?: number;

  @Expose({ name: 'pts_allow_0' })
  ptsAllow0?: number;

  @Expose({ name: 'pts_allow_1_6' })
  ptsAllow1_6?: number;

  @Expose({ name: 'pts_allow_7_13' })
  ptsAllow7_13?: number;

  @Expose({ name: 'pts_allow_14_20' })
  ptsAllow14_20?: number;

  @Expose({ name: 'pts_allow_21_27' })
  ptsAllow21_27?: number;

  @Expose({ name: 'pts_allow_28_34' })
  ptsAllow28_34?: number;

  @Expose({ name: 'pts_allow_35p' })
  ptsAllow35p?: number;

  @Expose()
  sack?: number;

  @Expose()
  int?: number;

  @Expose({ name: 'fum_rec' })
  fumRec?: number;

  @Expose()
  safe?: number;

  @Expose()
  ff?: number;

  @Expose({ name: 'blk_kick' })
  blkKick?: number;

  @Expose({ name: 'def_st_td' })
  defStTd?: number;

  @Expose({ name: 'def_st_ff' })
  defStFf?: number;

  @Expose({ name: 'def_st_fum_rec' })
  defStFumRec?: number;
}

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

  @Expose({ name: 'scoring_settings' })
  @Type(() => ScoringSettings)
  scoringSettings!: ScoringSettings;

  @Expose()
  @Type(() => LeagueSettings)
  settings!: LeagueSettings;
}
