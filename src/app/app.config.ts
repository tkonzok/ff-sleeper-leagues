import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideIndexedDb } from 'ngx-indexed-db';
import { MasterDataService } from '../domain/master-data.service';
import { INDEXED_DB_CONFIG } from './indexed-db-config';

export function initMasterDataFactory(masterDataService: MasterDataService) {
  return () => masterDataService.init();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideIndexedDb(INDEXED_DB_CONFIG),
    provideAppInitializer(() => {
      const initializerFn = initMasterDataFactory(inject(MasterDataService));
      return initializerFn();
    }),
  ],
};
