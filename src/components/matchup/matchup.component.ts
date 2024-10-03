import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
  standalone: true,
  imports: [NgForOf, NgIf, StarterComponent, NgClass],
  templateUrl: './matchup.component.html',
  styleUrls: ['./matchup.component.css'],
})
export class MatchupComponent implements OnInit {
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

  constructor(private sleeperService: SleeperService) {}

  ngOnInit(): void {
    this.sleeperService
      .getSleeperPlayers()
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
          let initialized = true;
          let myMatchup = matchups.find((matchup) => matchup.roster_id === this._rosterId);
          let opponentsMatchup = matchups.find(
            (matchup) => matchup.matchup_id === myMatchup?.matchup_id && matchup.roster_id !== this._rosterId,
          );

          if (!myMatchup || !opponentsMatchup) {
            return;
          }

          const myFilteredStarters = this.filterStarters(myMatchup);
          const opponentFilteredStarters = this.filterStarters(opponentsMatchup);

          this.myTeam = {
            starters: myFilteredStarters.map((item) => item.player),
            roster_id: myMatchup.roster_id,
            points: myMatchup.points,
            starters_points: myFilteredStarters.map((item) => myMatchup?.starters_points[item.index] || '0.00'),
          };

          this.opponent = {
            starters: opponentFilteredStarters.map((item) => item.player),
            roster_id: opponentsMatchup.roster_id,
            points: opponentsMatchup.points,
            starters_points: opponentFilteredStarters.map((item) => opponentsMatchup?.starters_points[item.index] || '0.00'),
          };
          this.updateTotalPoints();
        }),
      )
      .subscribe();
  }

  private filterStarters(matchup: Matchup) {
    return matchup.starters
      .map((starter, index) => ({
        player: this.allSleeperPlayers.find((player) => player.player_id === starter),
        index: index,
      }))
      .filter((item) => {
        const player = item.player;
        if (!player) {
          return false;
        }
        if (this.selectedGame === undefined) {
          return true;
        }
        return [this.selectedGame?.guestTeam, this.selectedGame?.homeTeam].includes(player.team);
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
      return roster.starters_points[index];
    });
    return totalPointsArray.reduce((acc: number, cum: string) => acc + parseFloat(cum), 0).toFixed(2);
  }

  private getPointDifferential() {
    const myPoints = parseFloat(this.myTotalPoints);
    const opponentPoints = parseFloat(this.opponentTotalPoints);
    const difference = myPoints - opponentPoints;
    return difference > 0 ? `+${difference.toFixed(2)}` : difference.toFixed(2);
  }
}
