import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { forkJoin, map, switchMap, tap } from 'rxjs';
import { League } from '../classes/league';
import { Schedule } from '../classes/schedule';
import { MatchupComponent } from '../components/matchup/matchup.component';
import { ScheduleComponent } from '../components/schedule/schedule.component';
import { SleeperService } from '../services/sleeper.service';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, MatchupComponent, ScheduleComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private sleeperService = inject(SleeperService);

  protected readonly location = location;
  protected leagues: League[] = [];
  protected rosterIds: Map<string, number | null> = new Map<string, number | null>();
  protected selectedWeek: number = 1;
  protected selectedGame?: Schedule;
  protected viewedGames: Schedule[] = [];
  protected initialized: boolean = false;

  private readonly USER_ID: string = '855945059361755136';

  ngOnInit() {
    forkJoin({
      leagues: this.sleeperService.getLeagues(this.USER_ID).pipe(
        switchMap((leagues) => {
          const leagueObservables = leagues.map((league: League) =>
            this.sleeperService.getRosterId(league.leagueId, this.USER_ID).pipe(
              tap((rosterId: number | null) => {
                this.rosterIds.set(league.leagueId, rosterId);
              }),
              switchMap(() => [league]),
            ),
          );
          return forkJoin(leagueObservables);
        }),
        tap((leagues: League[]) => {
          this.leagues = this.sortLeagues(leagues);
        }),
      ),
      week: this.sleeperService.getWeek(),
    }).subscribe(({ leagues, week }) => {
      this.selectedWeek = week || 1;
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

  protected updatePlayers() {
    this.sleeperService
      .updateSleeperPlayers()
      .pipe(map(() => this.location.reload()))
      .subscribe();
  }

  private sortLeagues(leagues: League[]) {
    return leagues.sort((a, b) => {
      const order = (val?: boolean) => {
        return val ? 1 : 0;
      };

      return order(a.settings.bestBall) - order(b.settings.bestBall);
    });
  }
}
