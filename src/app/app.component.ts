import { Component } from '@angular/core';
import { LeaguesComponent } from '../components/leagues.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LeaguesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [],
})
export class AppComponent {}
