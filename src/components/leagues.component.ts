import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { forkJoin, switchMap, tap } from 'rxjs';
import { League } from '../domain/league';
import { Schedule } from '../domain/schedule';
import { SleeperService } from '../domain/sleeper.service';
import { MatchupComponent } from './matchup/matchup.component';
import { RosterComponent } from './roster/roster.component';
import { ScheduleComponent } from './schedule/schedule.component';

@Component({
  selector: 'app-leagues',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    RosterComponent,
    MatchupComponent,
    ScheduleComponent,
    NgClass,
    AsyncPipe,
  ],
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css'],
})
export class LeaguesComponent implements OnInit {
  protected leagues: League[] = [];
  protected rosterIds: Map<string, number | null> = new Map<string, number | null>();
  protected selectedWeek: number = 1;
  protected selectedGame?: Schedule;
  protected viewedGames: Schedule[] = [];
  protected initialized: boolean = false;

  private readonly USER_ID: string = '855945059361755136';

  constructor(private sleeperService: SleeperService) {}

  ngOnInit() {
    forkJoin({
      leagues: this.sleeperService.getLeagues(this.USER_ID).pipe(
        switchMap((leagues) => {
          const leagueObservables = leagues.map((league: League) =>
            this.sleeperService.getRosterId(league.league_id, this.USER_ID).pipe(
              tap((rosterId: number | null) => {
                this.rosterIds.set(league.league_id, rosterId);
              }),
              switchMap(() => [league]),
            ),
          );
          return forkJoin(leagueObservables);
        }),
        tap((leagues: League[]) => {
          this.leagues = leagues;
        }),
      ),
      week: this.sleeperService.getWeek(),
    }).subscribe(({ leagues, week }) => {
      this.selectedWeek = week;
      this.initialized = true;
    });
  }

  protected decrementSelectedWeek() {
    if (this.selectedWeek === 1) {
      return;
    }
    this.onToggleAllGamesViewed([]);
    this.selectedWeek -= 1;
    this.selectedGame = undefined;
  }

  protected incrementSelectedWeek() {
    if (this.selectedWeek === 17) {
      return;
    }
    this.onToggleAllGamesViewed([]);
    this.selectedWeek += 1;
    this.selectedGame = undefined;
  }

  protected onSelectGame(game: Schedule) {
    if (this.selectedGame === game) {
      this.selectedGame = undefined;
      return;
    }
    this.selectedGame = game;
  }

  protected onToggleGameViewed(game: Schedule) {
    if (this.viewedGames.includes(game)) {
      this.viewedGames = this.viewedGames.filter((g) => g !== game);
      return;
    }
    this.viewedGames = this.viewedGames.concat(game);
  }

  protected onToggleAllGamesViewed(games: Schedule[]) {
    this.viewedGames = games;
  }

  protected readonly location = location;
}
