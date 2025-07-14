import { NgClass, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { Component, DestroyRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { Schedule } from '../../domain/schedule';
import { ScheduleService } from '../../domain/schedule.service';
import { TeamLogoMapper } from '../../utils/team-logo-mapper';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [NgForOf, NgClass, NgOptimizedImage, NgIf],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent implements OnInit {
  protected fullSchedule: Schedule[] = [];
  protected filteredSchedule: Schedule[] = [];
  protected filteredScheduleMapByDate: [string, Schedule[]][] = [];
  protected teamLogoPaths: Record<string, string> = new TeamLogoMapper().getTeamLogoPaths();
  protected initialized: boolean = false;

  private _week?: number;
  private _viewedGames: Schedule[] = [];

  @Input() set week(value: number) {
    this._week = value;
    this.filterSchedule();
    this.sortSchedule();
    this.mapScheduleDates();
  }

  get week(): number | undefined {
    return this._week;
  }

  @Input() selectedGame?: Schedule;
  @Input() set viewedGames(games: Schedule[]) {
    this._viewedGames = games;
  }
  get viewedGames(): Schedule[] {
    return this._viewedGames;
  }

  @Output() selectGame: EventEmitter<Schedule> = new EventEmitter<Schedule>();
  @Output() toggleGameViewed: EventEmitter<Schedule> = new EventEmitter<Schedule>();
  @Output() toggleAllGamesViewed: EventEmitter<Schedule[]> = new EventEmitter<Schedule[]>();

  constructor(
    private scheduleService: ScheduleService,
    private readonly destroyRef$: DestroyRef,
  ) {}

  ngOnInit() {
    this.getSchedule().subscribe(() => {
      this.initialized = true;
    });
  }

  protected updateSchedule() {
    this.scheduleService.triggerScheduleUpdate().subscribe();
  }

  protected onSelectGame(game: Schedule) {
    this.selectGame.emit(game);
  }

  protected onSelectGameViewed(game: Schedule) {
    this.toggleGameViewed.emit(game);
  }

  protected onSelectAllGamesViewed(visible: boolean) {
    if (visible) {
      this.toggleAllGamesViewed.emit(this.filteredSchedule);
      return;
    }
    this.toggleAllGamesViewed.emit([]);
  }

  private getSchedule() {
    return this.scheduleService.getSchedule$().pipe(
      tap((schedule: Schedule[]) => {
        this.fullSchedule = schedule;
        this.filterSchedule();
        this.sortSchedule();
        this.mapScheduleDates();
      }),
      takeUntilDestroyed(this.destroyRef$),
    );
  }

  private filterSchedule() {
    this.filteredSchedule = this.fullSchedule.filter((game) => game.week === this.week);
  }

  private sortSchedule() {
    this.filteredSchedule = this.filteredSchedule.sort((a, b) => a.date.localeCompare(b.date));
  }

  private mapScheduleDates() {
    const map = this.filteredSchedule.reduce((map, schedule) => {
      const date = schedule.date;
      if (!map.has(date)) {
        map.set(date, []);
      }
      map.get(date)?.push(schedule);
      return map;
    }, new Map<string, Schedule[]>());
    this.filteredScheduleMapByDate = Array.from(map.entries());
  }
}
