import { Expose, Transform } from 'class-transformer';

export class SleeperPlayer {
  @Expose()
  @Transform(({ obj }) => obj.player_id ?? obj.playerId, { toClassOnly: true })
  playerId!: string;

  @Expose()
  @Transform(({ obj }) => obj.first_name ?? obj.firstName, { toClassOnly: true })
  firstName!: string;

  @Expose()
  @Transform(({ obj }) => obj.last_name ?? obj.lastName, { toClassOnly: true })
  lastName!: string;

  @Expose()
  @Transform(({ obj }) => obj.fantasy_positions ?? obj.fantasyPositions, { toClassOnly: true })
  fantasyPositions!: string[];

  @Expose()
  status!: string;

  @Expose()
  team!: string;

  @Expose()
  @Transform(({ obj }) => obj.injury_status ?? obj.injuryStatus, { toClassOnly: true })
  injuryStatus!: string;
}
