import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SleeperPlayer } from '../../../domain/sleeper-player';
import { TeamLogoMapper } from '../../../utils/team-logo-mapper';

@Component({
  selector: 'app-starter',
  imports: [NgIf],
  templateUrl: './starter.component.html',
  styleUrl: './starter.component.css',
})
export class StarterComponent {
  protected teamLogoPaths: Record<string, string> = new TeamLogoMapper().getTeamLogoPaths();
  private _points: string | null = null;

  @Input() starter: SleeperPlayer | undefined;
  @Input() isOpponent: boolean = false;
  @Input() set points(value: string | null) {
    this._points = value;
  }

  get points(): string | null {
    return this._points;
  }
}
