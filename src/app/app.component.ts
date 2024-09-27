import {Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {LeaguesComponent} from "../components/leagues.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    LeaguesComponent
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
  providers: [],
})
export class AppComponent {}
