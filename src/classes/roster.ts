import { Expose } from 'class-transformer';

export class Roster {
  @Expose()
  starters!: string[];

  @Expose({ name: 'roster_id' })
  rosterId!: number;

  @Expose()
  players!: string[];

  @Expose({ name: 'owner_id' })
  ownerId!: string;

  @Expose({ name: 'league_id' })
  leagueId!: string;
}
