import { NgClass } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { map, tap } from 'rxjs';
import { League } from '../../classes/league';
import { Matchup } from '../../classes/matchup';
import { MatchupRoster } from '../../classes/matchup-roster';
import { Schedule } from '../../classes/schedule';
import { SleeperPlayer } from '../../classes/sleeper-player';
import { SleeperService } from '../../services/sleeper.service';
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
    if (!this._league?.leagueId || this._rosterId === undefined || this._rosterId === null) {
      return;
    }

    this.sleeperService
      .getMatchups(this._league.leagueId, this._week.toString())
      .pipe(
        tap((matchups) => {
          let myMatchup = matchups.find((matchup) => matchup.rosterId === this._rosterId);
          let opponentsMatchup = matchups.find(
            (matchup) => matchup.matchupId === myMatchup?.matchupId && matchup.rosterId !== this._rosterId,
          );

          if (!myMatchup || !opponentsMatchup) {
            return;
          }

          const myFilteredStarters = this.filterPlayers(myMatchup);
          const opponentFilteredStarters = this.filterPlayers(opponentsMatchup);

          this.myTeam = {
            players: myFilteredStarters,
            rosterId: myMatchup.rosterId,
            points: myMatchup.points,
            playersPoints: myFilteredStarters.map((player) => myMatchup?.playersPoints[player.playerId].toFixed(2) || '0.00'),
          };

          this.opponent = {
            players: opponentFilteredStarters,
            rosterId: opponentsMatchup.rosterId,
            points: opponentsMatchup.points,
            playersPoints: opponentFilteredStarters.map(
              (player) => opponentsMatchup?.playersPoints[player.playerId].toFixed(2) || '0.00',
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
    return this.league.settings.bestBall
      ? this.getBestBallPlayers(matchup)
      : matchup.starters
          .map((playerId) => this.allSleeperPlayers.find((p) => p.playerId === playerId))
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
      .map((playerId) => this.allSleeperPlayers.find((p) => p.playerId === playerId))
      .filter((p): p is SleeperPlayer => !!p)
      .sort((a, b) => {
        const posA = positionOrder[a.fantasyPositions.filter((pos) => Object.keys(positionOrder).includes(pos))[0]] ?? 99;
        const posB = positionOrder[b.fantasyPositions.filter((pos) => Object.keys(positionOrder).includes(pos))[0]] ?? 99;
        if (posA !== posB) return posA - posB;
        const lastNameCmp = a.lastName.localeCompare(b.lastName);
        if (lastNameCmp !== 0) return lastNameCmp;
        return a.firstName.localeCompare(b.firstName);
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
    if (!roster.players) {
      return '0.00';
    }
    const totalPointsArray: string[] = roster.players.map((starter, index) => {
      if (!starter) {
        return '0.00';
      }
      if (!this.teamsWithShownPoints.includes(starter.team)) {
        return '0.00';
      }
      return roster.playersPoints[index];
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
      playerMap[p.playerId] = p;
    });

    // Build list of {id, points, positions}
    const playerPool = matchup.players
      .map((pid) => ({
        id: pid,
        points: matchup.playersPoints[pid] ?? 0,
        positions: playerMap[pid]?.fantasyPositions ?? [],
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
    for (const slot of league.rosterPositions) {
      const candidate = playerPool.find((p) => !used.has(p.id) && canFill(slot, p));
      if (candidate) {
        lineup.push(candidate.id);
        used.add(candidate.id);
      } else {
        lineup.push(null as any); // empty slot
      }
    }

    const totalPoints = lineup.reduce((sum, pid) => sum + (matchup.playersPoints[pid] ?? 0), 0);

    return { lineup, totalPoints };
  }
}
