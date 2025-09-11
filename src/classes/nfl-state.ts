import { Expose } from 'class-transformer';

export class NflState {
  @Expose()
  week!: number;

  @Expose({ name: 'display_week' })
  displayWeek!: number;

  @Expose()
  season!: string;
}
