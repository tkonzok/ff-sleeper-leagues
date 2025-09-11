import { Expose } from 'class-transformer';

export class SleeperPlayer {
  @Expose({ name: 'player_id' })
  playerId!: string;

  @Expose({ name: 'first_name' })
  firstName!: string;

  @Expose({ name: 'last_name' })
  lastName!: string;

  @Expose({ name: 'fantasy_positions' })
  fantasyPositions!: string[];

  @Expose()
  status!: string;

  @Expose()
  team!: string;

  @Expose({ name: 'injury_status' })
  injuryStatus!: string;
}
