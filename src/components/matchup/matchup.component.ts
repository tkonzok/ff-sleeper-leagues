import { NgClass } from '@angular/common';
import { Component, Input, OnInit, inject, signal } from '@angular/core';
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
  protected pointDifferential: string = '';
  protected readonly showScoring = signal(false)
  protected readonly Object = Object;

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
    this.loadMatchups();
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

  protected isBestBallStarter(playerId: any, opponent: MatchupRoster | undefined) {
    return !!opponent?.bestBallLineup?.some((entry) => entry?.player?.playerId === playerId);
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

          const myFilteredPlayers = this.filterPlayers(myMatchup);
          const opponentFilteredPlayers = this.filterPlayers(opponentsMatchup);

          this.myTeam = {
            players: myFilteredPlayers,
            rosterId: myMatchup.rosterId,
            points: '',
            playersPoints: myFilteredPlayers.map((player) => myMatchup?.playersPoints[player.playerId].toFixed(2) || '0.00'),
          };

          this.opponent = {
            players: opponentFilteredPlayers,
            rosterId: opponentsMatchup.rosterId,
            points: '',
            playersPoints: opponentFilteredPlayers.map(
              (player) => opponentsMatchup?.playersPoints[player.playerId].toFixed(2) || '0.00',
            ),
          };
          this.updateBestBallLineups();
          this.updateTotalPoints();
        }),
      )
      .subscribe();
  }

  private updateBestBallLineups() {
    if (this.myTeam && this.opponent && this.league.settings.bestBall) {
      this.myTeam.bestBallLineup = this.buildBestBallLineup(this._league, this.myTeam);
      this.opponent.bestBallLineup = this.buildBestBallLineup(this._league, this.opponent);
    }
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

        const teamsOfViewedGames = this.viewedGames.flatMap((game) => [game.homeTeam, game.guestTeam]);
        const pointsA = teamsOfViewedGames.includes(a.team) ? (matchup.playersPoints[a.playerId] ?? 0) : 0.001;
        const pointsB = teamsOfViewedGames.includes(b.team) ? (matchup.playersPoints[b.playerId] ?? 0) : 0.001;
        if (pointsB !== pointsA) return pointsB - pointsA;

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
    this.myTeam.points = this.getPointsOfViewedGames(this.myTeam);
    this.opponent.points = this.getPointsOfViewedGames(this.opponent);
    this.pointDifferential = this.getPointDifferential();
  }

  private getPointsOfViewedGames(roster: MatchupRoster): string {
    if (roster.bestBallLineup) {
      return roster.bestBallLineup.reduce((sum, playerObject) => sum + (playerObject?.points ?? 0), 0).toFixed(2);
    }
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
    const myPoints = parseFloat(this.myTeam?.points ?? '0');
    const opponentPoints = parseFloat(this.opponent?.points ?? '0');
    const difference = myPoints - opponentPoints;
    return difference > 0 ? `+${difference.toFixed(2)}` : difference.toFixed(2);
  }

  private buildBestBallLineup(league: League, roster: MatchupRoster) {
    // Build pool of available players with id, points, positions, and team
    const playerPool = roster.players
      .map((player, index) => ({
        player,
        id: player?.playerId ?? `unknown_${index}`,
        team: player?.team ?? '',
        points: parseFloat(roster.playersPoints[index] ?? '0'),
        positions: player?.fantasyPositions ?? [],
      }))
      // Only consider players from teams with shown points
      .filter((p) => p.player !== undefined && p.positions.length > 0 && this.teamsWithShownPoints.includes(p.team));

    // Sort by points descending
    playerPool.sort((a, b) => b.points - a.points);

    // Helper: check if player can fill a slot
    const canFill = (slot: string, player: { positions: string[] }) => {
      if (slot === 'FLEX') {
        return player.positions.some((pos) => ['RB', 'WR', 'TE'].includes(pos));
      }
      if (slot === 'SUPER_FLEX') {
        return player.positions.some((pos) => ['QB', 'RB', 'WR', 'TE'].includes(pos));
      }
      return player.positions.includes(slot); // strict position match
    };

    const lineup: ({ player: SleeperPlayer; points: number } | null)[] = [];
    const used = new Set<string>();

    // Fill each roster slot in order
    for (const slot of league.rosterPositions) {
      const candidate = playerPool.find((p) => !used.has(p.id) && canFill(slot, p));
      if (candidate) {
        lineup.push({ player: candidate.player!, points: candidate.points });
        used.add(candidate.id);
      } else {
        lineup.push(null); // no eligible player for this slot
      }
    }
    return lineup;
  }
}
