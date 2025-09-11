import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { map, Observable, of, ReplaySubject, switchMap, take, tap } from 'rxjs';
import { STORE_NAME_SCHEDULE } from '../app/indexed-db-config';
import { environment } from '../environments/environment';
import { ObservableInstanceMapper } from '../utils/observable-instance-mapper';
import { Schedule } from './schedule';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private http = inject(HttpClient);
  private dbService = inject(NgxIndexedDBService);

  private static readonly SCHEDULE_URL: string = `${environment.apiUrl}/schedule`;
  private readonly schedule$: ReplaySubject<Schedule[]> = new ReplaySubject(1);

  init(): Observable<void> {
    return this.loadAll().pipe(
      tap((schedule) => this.schedule$.next(schedule)),
      switchMap(() => this.refreshAll()),
      map(() => undefined),
    );
  }

  getSchedule$(): Observable<Schedule[]> {
    return this.schedule$.asObservable();
  }

  triggerScheduleUpdate() {
    return this.postUpdateScheduleToApi().pipe(
      take(1),
      switchMap(() => this.refreshAll()),
    );
  }

  refreshAll() {
    return this.loadScheduleFromApi().pipe(
      take(1),
      tap((schedule) => this.schedule$.next(schedule)),
      switchMap((schedule) =>
        this.clearAll().pipe(
          map(() => schedule),
          switchMap((schedule) => this.storeScheduleInDB(schedule)),
        ),
      ),
    );
  }

  private loadAll(): Observable<Schedule[]> {
    return this.dbService
      .count(STORE_NAME_SCHEDULE)
      .pipe(switchMap((count: number) => (count > 0 ? this.loadScheduleFromDB() : of([]))));
  }

  private loadScheduleFromApi(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(ScheduleService.SCHEDULE_URL).pipe(
      map((schedule: Schedule[]) =>
        plainToInstance(Schedule, schedule, {
          excludeExtraneousValues: true,
        }),
      ),
    );
  }

  private postUpdateScheduleToApi() {
    return this.http.post(ScheduleService.SCHEDULE_URL + '/update', {});
  }

  private loadScheduleFromDB(): Observable<Schedule[]> {
    return ObservableInstanceMapper.valuesToInstance(this.dbService.getAll<Schedule>(STORE_NAME_SCHEDULE), Schedule);
  }

  private storeScheduleInDB(schedule: Schedule[]): Observable<number[]> {
    return this.dbService.bulkAdd(STORE_NAME_SCHEDULE, schedule);
  }

  private clearAll(): Observable<void> {
    return this.dbService.clear(STORE_NAME_SCHEDULE);
  }
}
