import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { map, Observable, of, ReplaySubject, switchMap, take, tap } from 'rxjs';
import { STORE_NAME_SLEEPER_PLAYERS } from '../app/indexed-db-config';
import { League } from '../classes/league';
import { Matchup } from '../classes/matchup';
import { NflState } from '../classes/nfl-state';
import { Roster } from '../classes/roster';
import { SleeperPlayer } from '../classes/sleeper-player';
import { environment } from '../environments/environment';
import { ObservableInstanceMapper } from '../utils/observable-instance-mapper';

@Injectable({
  providedIn: 'root',
})
export class SleeperService {
  private http = inject(HttpClient);
  private dbService = inject(NgxIndexedDBService);

  private static readonly SLEEPER_PLAYERS_URL: string = `${environment.apiUrl}/sleeper-players`;
  private static readonly SLEEPER_API_URL: string = 'https://api.sleeper.app/v1';
  private readonly sleeperPlayers$: ReplaySubject<SleeperPlayer[]> = new ReplaySubject(1);

  init(): Observable<void> {
    return this.loadAll().pipe(
      tap((sleeperPlayers) => this.sleeperPlayers$.next(sleeperPlayers)),
      switchMap(() => this.refreshAll()),
      map(() => undefined),
    );
  }

  getSleeperPlayers$(): Observable<SleeperPlayer[]> {
    return this.sleeperPlayers$.asObservable();
  }

  updateSleeperPlayers() {
    return this.http.post(SleeperService.SLEEPER_PLAYERS_URL + '/update', {});
  }

  getLeagues(userId: string) {
    return this.http
      .get<League[]>(`${SleeperService.SLEEPER_API_URL}/user/${userId}/leagues/nfl/2025`)
      .pipe(map((leagues) => plainToInstance(League, leagues, { excludeExtraneousValues: true })));
  }

  getRosterId(leagueId: string, userId: string): Observable<number | null> {
    return this.http.get<Roster[]>(`${SleeperService.SLEEPER_API_URL}/league/${leagueId}/rosters`).pipe(
      map((rosters) => plainToInstance(Roster, rosters, { excludeExtraneousValues: true })),
      map((rosters: Roster[]) => rosters.find((roster) => roster.ownerId === userId)?.rosterId || null),
    );
  }

  getMatchups(leagueId: string, week: string): Observable<Matchup[]> {
    return this.http
      .get<Matchup[]>(`${SleeperService.SLEEPER_API_URL}/league/${leagueId}/matchups/${week}`)
      .pipe(map((matchups) => plainToInstance(Matchup, matchups, { excludeExtraneousValues: true })));
  }

  getWeek(): Observable<number> {
    return this.http.get<NflState>(`${SleeperService.SLEEPER_API_URL}/state/nfl`).pipe(map((state) => state.displayWeek));
  }

  refreshAll() {
    return this.loadSleeperPlayersFromApi().pipe(
      take(1),
      tap((sleeperPlayers) => this.sleeperPlayers$.next(sleeperPlayers)),
      switchMap((sleeperPlayers) =>
        this.clearAll().pipe(
          map(() => sleeperPlayers),
          switchMap((schedule) => this.storeSleeperPlayersInDB(schedule)),
        ),
      ),
    );
  }

  private loadAll(): Observable<SleeperPlayer[]> {
    return this.dbService
      .count(STORE_NAME_SLEEPER_PLAYERS)
      .pipe(switchMap((count: number) => (count > 0 ? this.loadSleeperPlayersFromDB() : of([]))));
  }

  private loadSleeperPlayersFromApi(): Observable<SleeperPlayer[]> {
    return this.http.get<SleeperPlayer[]>(SleeperService.SLEEPER_PLAYERS_URL).pipe(
      map((sleeperPlayers: SleeperPlayer[]) =>
        plainToInstance(SleeperPlayer, sleeperPlayers, {
          excludeExtraneousValues: true,
        }),
      ),
    );
  }

  private loadSleeperPlayersFromDB(): Observable<SleeperPlayer[]> {
    return ObservableInstanceMapper.valuesToInstance(
      this.dbService.getAll<SleeperPlayer>(STORE_NAME_SLEEPER_PLAYERS),
      SleeperPlayer,
    );
  }

  private storeSleeperPlayersInDB(sleeperPlayers: SleeperPlayer[]): Observable<number[]> {
    return this.dbService.bulkAdd(STORE_NAME_SLEEPER_PLAYERS, sleeperPlayers);
  }

  private clearAll(): Observable<void> {
    return this.dbService.clear(STORE_NAME_SLEEPER_PLAYERS);
  }
}
