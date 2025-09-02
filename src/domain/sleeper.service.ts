import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { League } from './league';
import { Matchup } from './matchup';
import { NflState } from './nfl-state';
import { Roster } from './roster';
import { SleeperPlayer } from './sleeper-player';

@Injectable({
  providedIn: 'root',
})
export class SleeperService {
  private static readonly SLEEPER_PLAYERS_URL: string = `${environment.apiUrl}/sleeper-players`;
  private static readonly SLEEPER_API_URL: string = 'https://api.sleeper.app/v1';

  constructor(private http: HttpClient) {}

  getSleeperPlayers(): Observable<SleeperPlayer[]> {
    return this.http.get<SleeperPlayer[]>(SleeperService.SLEEPER_PLAYERS_URL).pipe(
      map((sleeperPlayers) =>
        plainToInstance(SleeperPlayer, sleeperPlayers, {
          excludeExtraneousValues: true,
        }),
      ),
    );
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
      map((rosters: Roster[]) => rosters.find((roster) => roster.owner_id === userId)?.roster_id || null),
    );
  }

  getMatchups(leagueId: string, week: string): Observable<Matchup[]> {
    return this.http
      .get<Matchup[]>(`${SleeperService.SLEEPER_API_URL}/league/${leagueId}/matchups/${week}`)
      .pipe(map((matchups) => plainToInstance(Matchup, matchups, { excludeExtraneousValues: true })));
  }

  getWeek(): Observable<number> {
    return this.http.get<NflState>(`${SleeperService.SLEEPER_API_URL}/state/nfl`).pipe(map((state) => state.display_week));
  }
}
