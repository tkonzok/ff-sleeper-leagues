import { Component, Input, input } from '@angular/core';
import { SleeperPlayer } from '../../../classes/sleeper-player';
import { TeamLogoMapper } from '../../../utils/team-logo-mapper';

@Component({
  selector: 'app-starter',
  imports: [],
  templateUrl: './starter.component.html',
  styleUrl: './starter.component.css',
})
export class StarterComponent {
  protected teamLogoPaths: Record<string, string> = new TeamLogoMapper().getTeamLogoPaths();
  private _points: string | null = null;

  readonly starter = input.required<SleeperPlayer>();
  readonly highlight = input<boolean>(false);
  readonly fade = input<boolean>(false);

  @Input() set points(value: string | null) {
    this._points = value;
  }

  get points(): string | null {
    return this._points;
  }

  protected getBorderClass(player: SleeperPlayer | undefined) {
    if (!this.highlight() || !player || !player.fantasyPositions?.length) return '';
    switch (true) {
      case player.fantasyPositions.includes('TE'):
        return 'border-amber';
      case player.fantasyPositions.includes('WR'):
        return 'border-blue';
      case player.fantasyPositions.includes('RB'):
        return 'border-green';
      case player.fantasyPositions.includes('QB'):
        return 'border-white';
      default:
        return '';
    }
  }
}
