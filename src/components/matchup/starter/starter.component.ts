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
  readonly isOpponent = input<boolean>(false);
  @Input() set points(value: string | null) {
    this._points = value;
  }

  get points(): string | null {
    return this._points;
  }
}
