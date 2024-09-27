import {Component, Input} from '@angular/core';
import {SleeperPlayer} from "../../../domain/sleeper-player";
import {TeamLogoMapper} from "../../../utils/team-logo-mapper";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-starter',
  standalone: true,
  imports: [NgIf],
  templateUrl: './starter.component.html',
  styleUrl: './starter.component.css',
})
export class StarterComponent {
  protected teamLogoPaths: Record<string, string> = new TeamLogoMapper().getTeamLogoPaths();
  @Input() starter: SleeperPlayer | undefined;
  @Input() opponent: boolean = false;
}
