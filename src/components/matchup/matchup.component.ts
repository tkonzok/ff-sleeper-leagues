import { NgClass } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { map, tap } from 'rxjs';
import { League } from '../../domain/league';
import { Matchup } from '../../domain/matchup';
import { MatchupRoster } from '../../domain/matchup-roster';
import { Schedule } from '../../domain/schedule';
import { SleeperPlayer } from '../../domain/sleeper-player';
import { SleeperService } from '../../domain/sleeper.service';
import { StarterComponent } from './starter/starter.component';

@Component({
  selector: 'app-matchup',
  imports: [StarterComponent, NgClass],
  templateUrl: './matchup.component.html',
  styleUrls: ['./matchup.component.css'],
})
export class MatchupComponent implements OnInit {
  private sleeperService = inject(SleeperService);

  protected allSleeperPlayers: SleeperPlayer[] = [];
  protected myTeam?: MatchupRoster;
  protected opponent?: MatchupRoster;
  protected teamsWithShownPoints: string[] = [];
  protected myTotalPoints: string = '';
  protected opponentTotalPoints: string = '';
  protected pointDifferential: string = '';
  protected initialized = false;

  private _league!: League;
  private _rosterId: number | null | undefined;
  private _week: number = 1;
  private _selectedGame?: Schedule;
  private _viewedGames: Schedule[] = [];

  @Input({ required: true })
  set league(value: League) {
    this._league = value;
    this.loadMatchups();
  }
  get league(): League {
    return this._league;
  }

  @Input()
  set rosterId(value: number | null | undefined) {
    this._rosterId = value;
    this.loadMatchups();
  }
  get rosterId(): number | null | undefined {
    return this._rosterId;
  }

  @Input()
  set week(value: number) {
    this._week = value;
    this.loadMatchups();
  }
  get week(): number {
    return this._week;
  }

  @Input()
  set selectedGame(game: Schedule | undefined) {
    this._selectedGame = game;
    this.loadMatchups();
  }
  get selectedGame(): Schedule | undefined {
    return this._selectedGame;
  }

  @Input()
  set viewedGames(games: Schedule[]) {
    this._viewedGames = games;
    this.updateTeamsWithShownPoints();
    this.updateTotalPoints();
  }
  get viewedGames(): Schedule[] {
    return this._viewedGames;
  }

  ngOnInit(): void {
    this.sleeperService
      .getSleeperPlayers$()
      .pipe(
        map((sleeperPlayers) => {
          this.allSleeperPlayers = sleeperPlayers;
          this.loadMatchups();
        }),
      )
      .subscribe();
  }

  private loadMatchups(): void {
    if (!this._league?.league_id || this._rosterId === undefined || this._rosterId === null) {
      return;
    }

    this.sleeperService
      .getMatchups(this._league.league_id, this._week.toString())
      .pipe(
        tap((matchups) => {
          let myMatchup = matchups.find((matchup) => matchup.roster_id === this._rosterId);
          let opponentsMatchup = matchups.find(
            (matchup) => matchup.matchup_id === myMatchup?.matchup_id && matchup.roster_id !== this._rosterId,
          );

          if (!myMatchup || !opponentsMatchup) {
            return;
          }

          const myFilteredStarters = this.filterPlayers(myMatchup);
          const opponentFilteredStarters = this.filterPlayers(opponentsMatchup);

          this.myTeam = {
            starters: myFilteredStarters,
            roster_id: myMatchup.roster_id,
            points: myMatchup.points,
            players_points: myFilteredStarters.map((player) => myMatchup?.players_points[player.player_id].toFixed(2) || '0.00'),
          };

          this.opponent = {
            starters: opponentFilteredStarters,
            roster_id: opponentsMatchup.roster_id,
            points: opponentsMatchup.points,
            players_points: opponentFilteredStarters.map(
              (player) => opponentsMatchup?.players_points[player.player_id].toFixed(2) || '0.00',
            ),
          };
          this.updateTotalPoints();
        }),
      )
      .subscribe();
  }

  private filterPlayers(matchup: Matchup) {
    const players = this.getPlayers(matchup);
    return players.filter((player) => {
      if (!player) {
        return false;
      }
      if (this.selectedGame === undefined) {
        return true;
      }
      return [this.selectedGame?.guestTeam, this.selectedGame?.homeTeam].includes(player.team);
    });
  }

  private getPlayers(matchup: Matchup): SleeperPlayer[] {
    return this.league.settings.best_ball === 1
      ? this.getBestBallPlayers(matchup)
      : matchup.starters
          .map((playerId) => this.allSleeperPlayers.find((p) => p.player_id === playerId))
          .filter((p): p is SleeperPlayer => !!p);
  }

  private getBestBallPlayers(matchup: Matchup) {
    const positionOrder: Record<string, number> = {
      QB: 1,
      RB: 2,
      WR: 3,
      TE: 4,
    };

    return matchup.players
      .map((playerId) => this.allSleeperPlayers.find((p) => p.player_id === playerId))
      .filter((p): p is SleeperPlayer => !!p)
      .sort((a, b) => {
        const posA = positionOrder[a.fantasy_positions.filter((pos) => Object.keys(positionOrder).includes(pos))[0]] ?? 99;
        const posB = positionOrder[b.fantasy_positions.filter((pos) => Object.keys(positionOrder).includes(pos))[0]] ?? 99;
        if (posA !== posB) return posA - posB;
        const lastNameCmp = a.last_name.localeCompare(b.last_name);
        if (lastNameCmp !== 0) return lastNameCmp;
        return a.first_name.localeCompare(b.first_name);
      });
  }

  private updateTeamsWithShownPoints() {
    this.teamsWithShownPoints = this.viewedGames.reduce((acc: string[], game: Schedule) => {
      if (game.guestTeam) {
        acc.push(game.guestTeam);
      }
      if (game.homeTeam) {
        acc.push(game.homeTeam);
      }
      return acc;
    }, []);
  }

  private updateTotalPoints() {
    if (!this.myTeam || !this.opponent) {
      return;
    }
    this.myTotalPoints = this.getPointsOfViewedGames(this.myTeam);
    this.opponentTotalPoints = this.getPointsOfViewedGames(this.opponent);
    this.pointDifferential = this.getPointDifferential();
  }

  private getPointsOfViewedGames(roster: MatchupRoster): string {
    if (!roster.starters) {
      return '0.00';
    }
    const totalPointsArray: string[] = roster.starters.map((starter, index) => {
      if (!starter) {
        return '0.00';
      }
      if (!this.teamsWithShownPoints.includes(starter.team)) {
        return '0.00';
      }
      return roster.players_points[index];
    });
    return totalPointsArray.reduce((acc: number, cum: string) => acc + parseFloat(cum), 0).toFixed(2);
  }

  private getPointDifferential() {
    const myPoints = parseFloat(this.myTotalPoints);
    const opponentPoints = parseFloat(this.opponentTotalPoints);
    const difference = myPoints - opponentPoints;
    return difference > 0 ? `+${difference.toFixed(2)}` : difference.toFixed(2);
  }

  private buildBestBallLineup(league: League, matchup: Matchup, players: SleeperPlayer[]) {
    // Map player_id → player
    const playerMap: Record<string, SleeperPlayer> = {};
    players.forEach((p) => {
      playerMap[p.player_id] = p;
    });

    // Build list of {id, points, positions}
    const playerPool = matchup.players
      .map((pid) => ({
        id: pid,
        points: matchup.players_points[pid] ?? 0,
        positions: playerMap[pid]?.fantasy_positions ?? [],
      }))
      .filter((p) => p.positions.length > 0);

    // Sort by points desc
    playerPool.sort((a, b) => b.points - a.points);

    // Helper: check if player can fill a slot
    const canFill = (slot: string, player: { positions: string[] }) => {
      if (slot === 'FLEX') return player.positions.some((pos) => ['RB', 'WR', 'TE'].includes(pos));
      if (slot === 'SUPER_FLEX') return player.positions.some((pos) => ['QB', 'RB', 'WR', 'TE'].includes(pos));
      return player.positions.includes(slot); // strict match
    };

    const lineup: string[] = [];
    const used = new Set<string>();

    // Fill each roster slot in order
    for (const slot of league.roster_positions) {
      const candidate = playerPool.find((p) => !used.has(p.id) && canFill(slot, p));
      if (candidate) {
        lineup.push(candidate.id);
        used.add(candidate.id);
      } else {
        lineup.push(null as any); // empty slot
      }
    }

    const totalPoints = lineup.reduce((sum, pid) => sum + (matchup.players_points[pid] ?? 0), 0);

    return { lineup, totalPoints };
  }
}
