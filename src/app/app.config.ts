import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection, inject, provideAppInitializer } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideIndexedDb } from 'ngx-indexed-db';
import { MasterDataService } from '../domain/master-data.service';
import { routes } from './app.routes';
import { INDEXED_DB_CONFIG } from './indexed-db-config';

export function initMasterDataFactory(masterDataService: MasterDataService) {
  return () => masterDataService.init();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideIndexedDb(INDEXED_DB_CONFIG),
    provideAppInitializer(() => {
        const initializerFn = (initMasterDataFactory)(inject(MasterDataService));
        return initializerFn();
      }),
  ],
};
