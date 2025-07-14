import { Routes } from '@angular/router';
import { AppGuard } from './app-resolver.service';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AppGuard],
    runGuardsAndResolvers: 'always',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
