import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { of } from 'rxjs';
import { environment } from '../environments/environment';
import { Schedule } from './schedule';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private static readonly SCHEDULE_URL: string = `${environment.apiUrl}/schedule`;

  constructor(private http: HttpClient) {}

  getSchedule() {
    const schedule: Schedule[] = JSON.parse(this.getStoredSchedule());
    return of(schedule.map((game) => plainToInstance(Schedule, game, { excludeExtraneousValues: true })));
  }

  // getSchedule() {
  //   return this.http
  //     .get<Schedule[]>(ScheduleService.SCHEDULE_URL)
  //     .pipe(
  //       map((schedule) =>
  //         plainToInstance(Schedule, schedule, {
  //           excludeExtraneousValues: true,
  //         }),
  //       ),
  //     );
  // }

  private getStoredSchedule() {
    return '[{"objectId":"66f6d9bdca5af0e53f0d2866","week":3,"homeTeam":"NYJ","guestTeam":"NE","date":"2024-09-20T00:15Z"},{"objectId":"66f6d9bdca5af0e53f0d2867","week":1,"homeTeam":"KC","guestTeam":"BAL","date":"2024-09-06T00:40Z"},{"objectId":"66f6d9bdca5af0e53f0d2868","week":1,"homeTeam":"PHI","guestTeam":"GB","date":"2024-09-07T00:15Z"},{"objectId":"66f6d9bdca5af0e53f0d2869","week":1,"homeTeam":"ATL","guestTeam":"PIT","date":"2024-09-08T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d286a","week":1,"homeTeam":"BUF","guestTeam":"ARI","date":"2024-09-08T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d286b","week":1,"homeTeam":"CHI","guestTeam":"TEN","date":"2024-09-08T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d286c","week":1,"homeTeam":"CIN","guestTeam":"NE","date":"2024-09-08T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d286d","week":1,"homeTeam":"IND","guestTeam":"HOU","date":"2024-09-08T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d286e","week":1,"homeTeam":"MIA","guestTeam":"JAX","date":"2024-09-08T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d286f","week":1,"homeTeam":"NO","guestTeam":"CAR","date":"2024-09-08T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2870","week":1,"homeTeam":"NYG","guestTeam":"MIN","date":"2024-09-08T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2871","week":1,"homeTeam":"LAC","guestTeam":"LV","date":"2024-09-08T20:05Z"},{"objectId":"66f6d9bdca5af0e53f0d2872","week":1,"homeTeam":"SEA","guestTeam":"DEN","date":"2024-09-08T20:05Z"},{"objectId":"66f6d9bdca5af0e53f0d2873","week":1,"homeTeam":"CLE","guestTeam":"DAL","date":"2024-09-08T20:25Z"},{"objectId":"66f6d9bdca5af0e53f0d2874","week":1,"homeTeam":"TB","guestTeam":"WAS","date":"2024-09-08T20:25Z"},{"objectId":"66f6d9bdca5af0e53f0d2875","week":1,"homeTeam":"DET","guestTeam":"LAR","date":"2024-09-09T00:20Z"},{"objectId":"66f6d9bdca5af0e53f0d2876","week":1,"homeTeam":"SF","guestTeam":"NYJ","date":"2024-09-10T00:15Z"},{"objectId":"66f6d9bdca5af0e53f0d2877","week":2,"homeTeam":"MIA","guestTeam":"BUF","date":"2024-09-13T00:15Z"},{"objectId":"66f6d9bdca5af0e53f0d2878","week":2,"homeTeam":"DAL","guestTeam":"NO","date":"2024-09-15T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2879","week":2,"homeTeam":"DET","guestTeam":"TB","date":"2024-09-15T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d287a","week":2,"homeTeam":"GB","guestTeam":"IND","date":"2024-09-15T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d287b","week":2,"homeTeam":"TEN","guestTeam":"NYJ","date":"2024-09-15T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d287c","week":2,"homeTeam":"MIN","guestTeam":"SF","date":"2024-09-15T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d287d","week":2,"homeTeam":"NE","guestTeam":"SEA","date":"2024-09-15T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d287e","week":2,"homeTeam":"WAS","guestTeam":"NYG","date":"2024-09-15T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d287f","week":2,"homeTeam":"CAR","guestTeam":"LAC","date":"2024-09-15T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2880","week":2,"homeTeam":"JAX","guestTeam":"CLE","date":"2024-09-15T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2881","week":2,"homeTeam":"BAL","guestTeam":"LV","date":"2024-09-15T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2882","week":2,"homeTeam":"ARI","guestTeam":"LAR","date":"2024-09-15T20:05Z"},{"objectId":"66f6d9bdca5af0e53f0d2883","week":2,"homeTeam":"DEN","guestTeam":"PIT","date":"2024-09-15T20:25Z"},{"objectId":"66f6d9bdca5af0e53f0d2884","week":2,"homeTeam":"KC","guestTeam":"CIN","date":"2024-09-15T20:25Z"},{"objectId":"66f6d9bdca5af0e53f0d2885","week":2,"homeTeam":"HOU","guestTeam":"CHI","date":"2024-09-16T00:20Z"},{"objectId":"66f6d9bdca5af0e53f0d2886","week":2,"homeTeam":"PHI","guestTeam":"ATL","date":"2024-09-17T00:15Z"},{"objectId":"66f6d9bdca5af0e53f0d2887","week":3,"homeTeam":"CLE","guestTeam":"NYG","date":"2024-09-22T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2888","week":3,"homeTeam":"TEN","guestTeam":"GB","date":"2024-09-22T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2889","week":3,"homeTeam":"IND","guestTeam":"CHI","date":"2024-09-22T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d288a","week":3,"homeTeam":"MIN","guestTeam":"HOU","date":"2024-09-22T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d288b","week":3,"homeTeam":"NO","guestTeam":"PHI","date":"2024-09-22T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d288c","week":3,"homeTeam":"PIT","guestTeam":"LAC","date":"2024-09-22T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d288d","week":3,"homeTeam":"TB","guestTeam":"DEN","date":"2024-09-22T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d288e","week":3,"homeTeam":"LV","guestTeam":"CAR","date":"2024-09-22T20:05Z"},{"objectId":"66f6d9bdca5af0e53f0d288f","week":3,"homeTeam":"SEA","guestTeam":"MIA","date":"2024-09-22T20:05Z"},{"objectId":"66f6d9bdca5af0e53f0d2890","week":3,"homeTeam":"DAL","guestTeam":"BAL","date":"2024-09-22T20:25Z"},{"objectId":"66f6d9bdca5af0e53f0d2891","week":3,"homeTeam":"LAR","guestTeam":"SF","date":"2024-09-22T20:25Z"},{"objectId":"66f6d9bdca5af0e53f0d2892","week":3,"homeTeam":"ARI","guestTeam":"DET","date":"2024-09-22T20:25Z"},{"objectId":"66f6d9bdca5af0e53f0d2893","week":3,"homeTeam":"ATL","guestTeam":"KC","date":"2024-09-23T00:20Z"},{"objectId":"66f6d9bdca5af0e53f0d2894","week":3,"homeTeam":"BUF","guestTeam":"JAX","date":"2024-09-23T23:30Z"},{"objectId":"66f6d9bdca5af0e53f0d2895","week":3,"homeTeam":"CIN","guestTeam":"WAS","date":"2024-09-24T00:15Z"},{"objectId":"66f6d9bdca5af0e53f0d2896","week":4,"homeTeam":"NYG","guestTeam":"DAL","date":"2024-09-27T00:15Z"},{"objectId":"66f6d9bdca5af0e53f0d2897","week":4,"homeTeam":"ATL","guestTeam":"NO","date":"2024-09-29T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2898","week":4,"homeTeam":"CHI","guestTeam":"LAR","date":"2024-09-29T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2899","week":4,"homeTeam":"GB","guestTeam":"MIN","date":"2024-09-29T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d289a","week":4,"homeTeam":"IND","guestTeam":"PIT","date":"2024-09-29T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d289b","week":4,"homeTeam":"NYJ","guestTeam":"DEN","date":"2024-09-29T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d289c","week":4,"homeTeam":"TB","guestTeam":"PHI","date":"2024-09-29T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d289d","week":4,"homeTeam":"CAR","guestTeam":"CIN","date":"2024-09-29T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d289e","week":4,"homeTeam":"HOU","guestTeam":"JAX","date":"2024-09-29T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d289f","week":4,"homeTeam":"ARI","guestTeam":"WAS","date":"2024-09-29T20:05Z"},{"objectId":"66f6d9bdca5af0e53f0d28a0","week":4,"homeTeam":"SF","guestTeam":"NE","date":"2024-09-29T20:05Z"},{"objectId":"66f6d9bdca5af0e53f0d28a1","week":4,"homeTeam":"LV","guestTeam":"CLE","date":"2024-09-29T20:25Z"},{"objectId":"66f6d9bdca5af0e53f0d28a2","week":4,"homeTeam":"LAC","guestTeam":"KC","date":"2024-09-29T20:25Z"},{"objectId":"66f6d9bdca5af0e53f0d28a3","week":4,"homeTeam":"BAL","guestTeam":"BUF","date":"2024-09-30T00:20Z"},{"objectId":"66f6d9bdca5af0e53f0d28a4","week":4,"homeTeam":"MIA","guestTeam":"TEN","date":"2024-09-30T23:30Z"},{"objectId":"66f6d9bdca5af0e53f0d28a5","week":4,"homeTeam":"DET","guestTeam":"SEA","date":"2024-10-01T00:15Z"},{"objectId":"66f6d9bdca5af0e53f0d28a6","week":5,"homeTeam":"ATL","guestTeam":"TB","date":"2024-10-04T00:15Z"},{"objectId":"66f6d9bdca5af0e53f0d28a7","week":5,"homeTeam":"MIN","guestTeam":"NYJ","date":"2024-10-06T13:30Z"},{"objectId":"66f6d9bdca5af0e53f0d28a8","week":5,"homeTeam":"CHI","guestTeam":"CAR","date":"2024-10-06T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28a9","week":5,"homeTeam":"CIN","guestTeam":"BAL","date":"2024-10-06T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28aa","week":5,"homeTeam":"NE","guestTeam":"MIA","date":"2024-10-06T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28ab","week":5,"homeTeam":"WAS","guestTeam":"CLE","date":"2024-10-06T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28ac","week":5,"homeTeam":"JAX","guestTeam":"IND","date":"2024-10-06T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28ad","week":5,"homeTeam":"HOU","guestTeam":"BUF","date":"2024-10-06T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28ae","week":5,"homeTeam":"DEN","guestTeam":"LV","date":"2024-10-06T20:05Z"},{"objectId":"66f6d9bdca5af0e53f0d28af","week":5,"homeTeam":"SF","guestTeam":"ARI","date":"2024-10-06T20:05Z"},{"objectId":"66f6d9bdca5af0e53f0d28b0","week":5,"homeTeam":"LAR","guestTeam":"GB","date":"2024-10-06T20:25Z"},{"objectId":"66f6d9bdca5af0e53f0d28b1","week":5,"homeTeam":"SEA","guestTeam":"NYG","date":"2024-10-06T20:25Z"},{"objectId":"66f6d9bdca5af0e53f0d28b2","week":5,"homeTeam":"PIT","guestTeam":"DAL","date":"2024-10-07T00:20Z"},{"objectId":"66f6d9bdca5af0e53f0d28b3","week":5,"homeTeam":"KC","guestTeam":"NO","date":"2024-10-08T00:15Z"},{"objectId":"66f6d9bdca5af0e53f0d28b4","week":6,"homeTeam":"SEA","guestTeam":"SF","date":"2024-10-11T00:15Z"},{"objectId":"66f6d9bdca5af0e53f0d28b5","week":6,"homeTeam":"CHI","guestTeam":"JAX","date":"2024-10-13T13:30Z"},{"objectId":"66f6d9bdca5af0e53f0d28b6","week":6,"homeTeam":"GB","guestTeam":"ARI","date":"2024-10-13T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28b7","week":6,"homeTeam":"TEN","guestTeam":"IND","date":"2024-10-13T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28b8","week":6,"homeTeam":"NE","guestTeam":"HOU","date":"2024-10-13T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28b9","week":6,"homeTeam":"NO","guestTeam":"TB","date":"2024-10-13T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28ba","week":6,"homeTeam":"PHI","guestTeam":"CLE","date":"2024-10-13T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28bb","week":6,"homeTeam":"BAL","guestTeam":"WAS","date":"2024-10-13T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28bc","week":6,"homeTeam":"DEN","guestTeam":"LAC","date":"2024-10-13T20:05Z"},{"objectId":"66f6d9bdca5af0e53f0d28bd","week":6,"homeTeam":"LV","guestTeam":"PIT","date":"2024-10-13T20:05Z"},{"objectId":"66f6d9bdca5af0e53f0d28be","week":6,"homeTeam":"DAL","guestTeam":"DET","date":"2024-10-13T20:25Z"},{"objectId":"66f6d9bdca5af0e53f0d28bf","week":6,"homeTeam":"CAR","guestTeam":"ATL","date":"2024-10-13T20:25Z"},{"objectId":"66f6d9bdca5af0e53f0d28c0","week":6,"homeTeam":"NYG","guestTeam":"CIN","date":"2024-10-14T00:20Z"},{"objectId":"66f6d9bdca5af0e53f0d28c1","week":6,"homeTeam":"NYJ","guestTeam":"BUF","date":"2024-10-15T00:15Z"},{"objectId":"66f6d9bdca5af0e53f0d28c2","week":7,"homeTeam":"NO","guestTeam":"DEN","date":"2024-10-18T00:15Z"},{"objectId":"66f6d9bdca5af0e53f0d28c3","week":7,"homeTeam":"JAX","guestTeam":"NE","date":"2024-10-20T13:30Z"},{"objectId":"66f6d9bdca5af0e53f0d28c4","week":7,"homeTeam":"ATL","guestTeam":"SEA","date":"2024-10-20T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28c5","week":7,"homeTeam":"BUF","guestTeam":"TEN","date":"2024-10-20T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28c6","week":7,"homeTeam":"CLE","guestTeam":"CIN","date":"2024-10-20T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28c7","week":7,"homeTeam":"GB","guestTeam":"HOU","date":"2024-10-20T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28c8","week":7,"homeTeam":"IND","guestTeam":"MIA","date":"2024-10-20T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28c9","week":7,"homeTeam":"MIN","guestTeam":"DET","date":"2024-10-20T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28ca","week":7,"homeTeam":"NYG","guestTeam":"PHI","date":"2024-10-20T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28cb","week":7,"homeTeam":"LAR","guestTeam":"LV","date":"2024-10-20T20:05Z"},{"objectId":"66f6d9bdca5af0e53f0d28cc","week":7,"homeTeam":"WAS","guestTeam":"CAR","date":"2024-10-20T20:05Z"},{"objectId":"66f6d9bdca5af0e53f0d28cd","week":7,"homeTeam":"SF","guestTeam":"KC","date":"2024-10-20T20:25Z"},{"objectId":"66f6d9bdca5af0e53f0d28ce","week":7,"homeTeam":"PIT","guestTeam":"NYJ","date":"2024-10-21T00:20Z"},{"objectId":"66f6d9bdca5af0e53f0d28cf","week":7,"homeTeam":"TB","guestTeam":"BAL","date":"2024-10-22T00:15Z"},{"objectId":"66f6d9bdca5af0e53f0d28d0","week":7,"homeTeam":"ARI","guestTeam":"LAC","date":"2024-10-22T01:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28d1","week":8,"homeTeam":"LAR","guestTeam":"MIN","date":"2024-10-25T00:15Z"},{"objectId":"66f6d9bdca5af0e53f0d28d2","week":8,"homeTeam":"CLE","guestTeam":"BAL","date":"2024-10-27T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28d3","week":8,"homeTeam":"DET","guestTeam":"TEN","date":"2024-10-27T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28d4","week":8,"homeTeam":"MIA","guestTeam":"ARI","date":"2024-10-27T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28d5","week":8,"homeTeam":"NE","guestTeam":"NYJ","date":"2024-10-27T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28d6","week":8,"homeTeam":"TB","guestTeam":"ATL","date":"2024-10-27T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28d7","week":8,"homeTeam":"WAS","guestTeam":"CHI","date":"2024-10-27T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28d8","week":8,"homeTeam":"JAX","guestTeam":"GB","date":"2024-10-27T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28d9","week":8,"homeTeam":"HOU","guestTeam":"IND","date":"2024-10-27T17:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28da","week":8,"homeTeam":"LAC","guestTeam":"NO","date":"2024-10-27T20:05Z"},{"objectId":"66f6d9bdca5af0e53f0d28db","week":8,"homeTeam":"SEA","guestTeam":"BUF","date":"2024-10-27T20:05Z"},{"objectId":"66f6d9bdca5af0e53f0d28dc","week":8,"homeTeam":"CIN","guestTeam":"PHI","date":"2024-10-27T20:25Z"},{"objectId":"66f6d9bdca5af0e53f0d28dd","week":8,"homeTeam":"DEN","guestTeam":"CAR","date":"2024-10-27T20:25Z"},{"objectId":"66f6d9bdca5af0e53f0d28de","week":8,"homeTeam":"LV","guestTeam":"KC","date":"2024-10-27T20:25Z"},{"objectId":"66f6d9bdca5af0e53f0d28df","week":8,"homeTeam":"SF","guestTeam":"DAL","date":"2024-10-28T00:20Z"},{"objectId":"66f6d9bdca5af0e53f0d28e0","week":8,"homeTeam":"PIT","guestTeam":"NYG","date":"2024-10-29T00:15Z"},{"objectId":"66f6d9bdca5af0e53f0d28e1","week":9,"homeTeam":"NYJ","guestTeam":"HOU","date":"2024-11-01T00:15Z"},{"objectId":"66f6d9bdca5af0e53f0d28e2","week":9,"homeTeam":"ATL","guestTeam":"DAL","date":"2024-11-03T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28e3","week":9,"homeTeam":"BUF","guestTeam":"MIA","date":"2024-11-03T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28e4","week":9,"homeTeam":"CIN","guestTeam":"LV","date":"2024-11-03T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28e5","week":9,"homeTeam":"CLE","guestTeam":"LAC","date":"2024-11-03T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28e6","week":9,"homeTeam":"TEN","guestTeam":"NE","date":"2024-11-03T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28e7","week":9,"homeTeam":"MIN","guestTeam":"IND","date":"2024-11-03T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28e8","week":9,"homeTeam":"NYG","guestTeam":"WAS","date":"2024-11-03T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28e9","week":9,"homeTeam":"CAR","guestTeam":"NO","date":"2024-11-03T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28ea","week":9,"homeTeam":"BAL","guestTeam":"DEN","date":"2024-11-03T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28eb","week":9,"homeTeam":"ARI","guestTeam":"CHI","date":"2024-11-03T21:05Z"},{"objectId":"66f6d9bdca5af0e53f0d28ec","week":9,"homeTeam":"GB","guestTeam":"DET","date":"2024-11-03T21:25Z"},{"objectId":"66f6d9bdca5af0e53f0d28ed","week":9,"homeTeam":"SEA","guestTeam":"LAR","date":"2024-11-03T21:25Z"},{"objectId":"66f6d9bdca5af0e53f0d28ee","week":9,"homeTeam":"PHI","guestTeam":"JAX","date":"2024-11-04T01:20Z"},{"objectId":"66f6d9bdca5af0e53f0d28ef","week":9,"homeTeam":"KC","guestTeam":"TB","date":"2024-11-05T01:15Z"},{"objectId":"66f6d9bdca5af0e53f0d28f0","week":10,"homeTeam":"BAL","guestTeam":"CIN","date":"2024-11-08T01:15Z"},{"objectId":"66f6d9bdca5af0e53f0d28f1","week":10,"homeTeam":"CAR","guestTeam":"NYG","date":"2024-11-10T14:30Z"},{"objectId":"66f6d9bdca5af0e53f0d28f2","week":10,"homeTeam":"CHI","guestTeam":"NE","date":"2024-11-10T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28f3","week":10,"homeTeam":"IND","guestTeam":"BUF","date":"2024-11-10T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28f4","week":10,"homeTeam":"KC","guestTeam":"DEN","date":"2024-11-10T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28f5","week":10,"homeTeam":"NO","guestTeam":"ATL","date":"2024-11-10T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28f6","week":10,"homeTeam":"TB","guestTeam":"SF","date":"2024-11-10T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28f7","week":10,"homeTeam":"WAS","guestTeam":"PIT","date":"2024-11-10T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28f8","week":10,"homeTeam":"JAX","guestTeam":"MIN","date":"2024-11-10T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d28f9","week":10,"homeTeam":"LAC","guestTeam":"TEN","date":"2024-11-10T21:05Z"},{"objectId":"66f6d9bdca5af0e53f0d28fa","week":10,"homeTeam":"DAL","guestTeam":"PHI","date":"2024-11-10T21:25Z"},{"objectId":"66f6d9bdca5af0e53f0d28fb","week":10,"homeTeam":"ARI","guestTeam":"NYJ","date":"2024-11-10T21:25Z"},{"objectId":"66f6d9bdca5af0e53f0d28fc","week":10,"homeTeam":"HOU","guestTeam":"DET","date":"2024-11-11T01:20Z"},{"objectId":"66f6d9bdca5af0e53f0d28fd","week":10,"homeTeam":"LAR","guestTeam":"MIA","date":"2024-11-12T01:15Z"},{"objectId":"66f6d9bdca5af0e53f0d28fe","week":11,"homeTeam":"PHI","guestTeam":"WAS","date":"2024-11-15T01:15Z"},{"objectId":"66f6d9bdca5af0e53f0d28ff","week":11,"homeTeam":"CHI","guestTeam":"GB","date":"2024-11-17T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2900","week":11,"homeTeam":"DET","guestTeam":"JAX","date":"2024-11-17T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2901","week":11,"homeTeam":"TEN","guestTeam":"MIN","date":"2024-11-17T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2902","week":11,"homeTeam":"MIA","guestTeam":"LV","date":"2024-11-17T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2903","week":11,"homeTeam":"NE","guestTeam":"LAR","date":"2024-11-17T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2904","week":11,"homeTeam":"NO","guestTeam":"CLE","date":"2024-11-17T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2905","week":11,"homeTeam":"PIT","guestTeam":"BAL","date":"2024-11-17T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2906","week":11,"homeTeam":"DEN","guestTeam":"ATL","date":"2024-11-17T21:05Z"},{"objectId":"66f6d9bdca5af0e53f0d2907","week":11,"homeTeam":"SF","guestTeam":"SEA","date":"2024-11-17T21:05Z"},{"objectId":"66f6d9bdca5af0e53f0d2908","week":11,"homeTeam":"BUF","guestTeam":"KC","date":"2024-11-17T21:25Z"},{"objectId":"66f6d9bdca5af0e53f0d2909","week":11,"homeTeam":"LAC","guestTeam":"CIN","date":"2024-11-17T21:25Z"},{"objectId":"66f6d9bdca5af0e53f0d290a","week":11,"homeTeam":"NYJ","guestTeam":"IND","date":"2024-11-18T01:20Z"},{"objectId":"66f6d9bdca5af0e53f0d290b","week":11,"homeTeam":"DAL","guestTeam":"HOU","date":"2024-11-19T01:15Z"},{"objectId":"66f6d9bdca5af0e53f0d290c","week":12,"homeTeam":"CLE","guestTeam":"PIT","date":"2024-11-22T01:15Z"},{"objectId":"66f6d9bdca5af0e53f0d290d","week":12,"homeTeam":"CHI","guestTeam":"MIN","date":"2024-11-24T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d290e","week":12,"homeTeam":"IND","guestTeam":"DET","date":"2024-11-24T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d290f","week":12,"homeTeam":"MIA","guestTeam":"NE","date":"2024-11-24T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2910","week":12,"homeTeam":"NYG","guestTeam":"TB","date":"2024-11-24T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2911","week":12,"homeTeam":"WAS","guestTeam":"DAL","date":"2024-11-24T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2912","week":12,"homeTeam":"CAR","guestTeam":"KC","date":"2024-11-24T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2913","week":12,"homeTeam":"HOU","guestTeam":"TEN","date":"2024-11-24T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2914","week":12,"homeTeam":"LV","guestTeam":"DEN","date":"2024-11-24T21:05Z"},{"objectId":"66f6d9bdca5af0e53f0d2915","week":12,"homeTeam":"GB","guestTeam":"SF","date":"2024-11-24T21:25Z"},{"objectId":"66f6d9bdca5af0e53f0d2916","week":12,"homeTeam":"SEA","guestTeam":"ARI","date":"2024-11-24T21:25Z"},{"objectId":"66f6d9bdca5af0e53f0d2917","week":12,"homeTeam":"LAR","guestTeam":"PHI","date":"2024-11-25T01:20Z"},{"objectId":"66f6d9bdca5af0e53f0d2918","week":12,"homeTeam":"LAC","guestTeam":"BAL","date":"2024-11-26T01:15Z"},{"objectId":"66f6d9bdca5af0e53f0d2919","week":13,"homeTeam":"DET","guestTeam":"CHI","date":"2024-11-28T17:30Z"},{"objectId":"66f6d9bdca5af0e53f0d291a","week":13,"homeTeam":"DAL","guestTeam":"NYG","date":"2024-11-28T21:30Z"},{"objectId":"66f6d9bdca5af0e53f0d291b","week":13,"homeTeam":"GB","guestTeam":"MIA","date":"2024-11-29T01:20Z"},{"objectId":"66f6d9bdca5af0e53f0d291c","week":13,"homeTeam":"KC","guestTeam":"LV","date":"2024-11-29T20:00Z"},{"objectId":"66f6d9bdca5af0e53f0d291d","week":13,"homeTeam":"ATL","guestTeam":"LAC","date":"2024-12-01T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d291e","week":13,"homeTeam":"CIN","guestTeam":"PIT","date":"2024-12-01T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d291f","week":13,"homeTeam":"MIN","guestTeam":"ARI","date":"2024-12-01T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2920","week":13,"homeTeam":"NE","guestTeam":"IND","date":"2024-12-01T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2921","week":13,"homeTeam":"NYJ","guestTeam":"SEA","date":"2024-12-01T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2922","week":13,"homeTeam":"WAS","guestTeam":"TEN","date":"2024-12-01T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2923","week":13,"homeTeam":"JAX","guestTeam":"HOU","date":"2024-12-01T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2924","week":13,"homeTeam":"NO","guestTeam":"LAR","date":"2024-12-01T21:05Z"},{"objectId":"66f6d9bdca5af0e53f0d2925","week":13,"homeTeam":"CAR","guestTeam":"TB","date":"2024-12-01T21:05Z"},{"objectId":"66f6d9bdca5af0e53f0d2926","week":13,"homeTeam":"BAL","guestTeam":"PHI","date":"2024-12-01T21:25Z"},{"objectId":"66f6d9bdca5af0e53f0d2927","week":13,"homeTeam":"BUF","guestTeam":"SF","date":"2024-12-02T01:20Z"},{"objectId":"66f6d9bdca5af0e53f0d2928","week":13,"homeTeam":"DEN","guestTeam":"CLE","date":"2024-12-03T01:15Z"},{"objectId":"66f6d9bdca5af0e53f0d2929","week":14,"homeTeam":"DET","guestTeam":"GB","date":"2024-12-06T01:15Z"},{"objectId":"66f6d9bdca5af0e53f0d292a","week":14,"homeTeam":"TEN","guestTeam":"JAX","date":"2024-12-08T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d292b","week":14,"homeTeam":"MIA","guestTeam":"NYJ","date":"2024-12-08T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d292c","week":14,"homeTeam":"MIN","guestTeam":"ATL","date":"2024-12-08T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d292d","week":14,"homeTeam":"NYG","guestTeam":"NO","date":"2024-12-08T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d292e","week":14,"homeTeam":"PHI","guestTeam":"CAR","date":"2024-12-08T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d292f","week":14,"homeTeam":"PIT","guestTeam":"CLE","date":"2024-12-08T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2930","week":14,"homeTeam":"TB","guestTeam":"LV","date":"2024-12-08T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2931","week":14,"homeTeam":"ARI","guestTeam":"SEA","date":"2024-12-08T21:05Z"},{"objectId":"66f6d9bdca5af0e53f0d2932","week":14,"homeTeam":"LAR","guestTeam":"BUF","date":"2024-12-08T21:25Z"},{"objectId":"66f6d9bdca5af0e53f0d2933","week":14,"homeTeam":"SF","guestTeam":"CHI","date":"2024-12-08T21:25Z"},{"objectId":"66f6d9bdca5af0e53f0d2934","week":14,"homeTeam":"KC","guestTeam":"LAC","date":"2024-12-09T01:20Z"},{"objectId":"66f6d9bdca5af0e53f0d2935","week":14,"homeTeam":"DAL","guestTeam":"CIN","date":"2024-12-10T01:15Z"},{"objectId":"66f6d9bdca5af0e53f0d2936","week":15,"homeTeam":"SF","guestTeam":"LAR","date":"2024-12-13T01:15Z"},{"objectId":"66f6d9bdca5af0e53f0d2937","week":15,"homeTeam":"CLE","guestTeam":"KC","date":"2024-12-15T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2938","week":15,"homeTeam":"TEN","guestTeam":"CIN","date":"2024-12-15T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2939","week":15,"homeTeam":"NO","guestTeam":"WAS","date":"2024-12-15T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d293a","week":15,"homeTeam":"NYG","guestTeam":"BAL","date":"2024-12-15T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d293b","week":15,"homeTeam":"CAR","guestTeam":"DAL","date":"2024-12-15T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d293c","week":15,"homeTeam":"JAX","guestTeam":"NYJ","date":"2024-12-15T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d293d","week":15,"homeTeam":"HOU","guestTeam":"MIA","date":"2024-12-15T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d293e","week":15,"homeTeam":"DEN","guestTeam":"IND","date":"2024-12-15T21:25Z"},{"objectId":"66f6d9bdca5af0e53f0d293f","week":15,"homeTeam":"DET","guestTeam":"BUF","date":"2024-12-15T21:25Z"},{"objectId":"66f6d9bdca5af0e53f0d2940","week":15,"homeTeam":"PHI","guestTeam":"PIT","date":"2024-12-15T21:25Z"},{"objectId":"66f6d9bdca5af0e53f0d2941","week":15,"homeTeam":"ARI","guestTeam":"NE","date":"2024-12-15T21:25Z"},{"objectId":"66f6d9bdca5af0e53f0d2942","week":15,"homeTeam":"LAC","guestTeam":"TB","date":"2024-12-15T21:25Z"},{"objectId":"66f6d9bdca5af0e53f0d2943","week":15,"homeTeam":"SEA","guestTeam":"GB","date":"2024-12-16T01:20Z"},{"objectId":"66f6d9bdca5af0e53f0d2944","week":15,"homeTeam":"MIN","guestTeam":"CHI","date":"2024-12-17T01:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2945","week":15,"homeTeam":"LV","guestTeam":"ATL","date":"2024-12-17T01:30Z"},{"objectId":"66f6d9bdca5af0e53f0d2946","week":16,"homeTeam":"CIN","guestTeam":"CLE","date":"2024-12-20T01:15Z"},{"objectId":"66f6d9bdca5af0e53f0d2947","week":16,"homeTeam":"KC","guestTeam":"HOU","date":"2024-12-21T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2948","week":16,"homeTeam":"BAL","guestTeam":"PIT","date":"2024-12-21T21:30Z"},{"objectId":"66f6d9bdca5af0e53f0d2949","week":16,"homeTeam":"ATL","guestTeam":"NYG","date":"2024-12-22T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d294a","week":16,"homeTeam":"BUF","guestTeam":"NE","date":"2024-12-22T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d294b","week":16,"homeTeam":"CHI","guestTeam":"DET","date":"2024-12-22T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d294c","week":16,"homeTeam":"IND","guestTeam":"TEN","date":"2024-12-22T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d294d","week":16,"homeTeam":"NYJ","guestTeam":"LAR","date":"2024-12-22T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d294e","week":16,"homeTeam":"WAS","guestTeam":"PHI","date":"2024-12-22T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d294f","week":16,"homeTeam":"CAR","guestTeam":"ARI","date":"2024-12-22T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2950","week":16,"homeTeam":"LAC","guestTeam":"DEN","date":"2024-12-22T21:05Z"},{"objectId":"66f6d9bdca5af0e53f0d2951","week":16,"homeTeam":"SEA","guestTeam":"MIN","date":"2024-12-22T21:05Z"},{"objectId":"66f6d9bdca5af0e53f0d2952","week":16,"homeTeam":"LV","guestTeam":"JAX","date":"2024-12-22T21:25Z"},{"objectId":"66f6d9bdca5af0e53f0d2953","week":16,"homeTeam":"MIA","guestTeam":"SF","date":"2024-12-22T21:25Z"},{"objectId":"66f6d9bdca5af0e53f0d2954","week":16,"homeTeam":"DAL","guestTeam":"TB","date":"2024-12-23T01:20Z"},{"objectId":"66f6d9bdca5af0e53f0d2955","week":16,"homeTeam":"GB","guestTeam":"NO","date":"2024-12-24T01:15Z"},{"objectId":"66f6d9bdca5af0e53f0d2956","week":17,"homeTeam":"PIT","guestTeam":"KC","date":"2024-12-25T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2957","week":17,"homeTeam":"HOU","guestTeam":"BAL","date":"2024-12-25T21:30Z"},{"objectId":"66f6d9bdca5af0e53f0d2958","week":17,"homeTeam":"CHI","guestTeam":"SEA","date":"2024-12-27T01:15Z"},{"objectId":"66f6d9bdca5af0e53f0d2959","week":17,"homeTeam":"CIN","guestTeam":"DEN","date":"2024-12-29T05:00Z"},{"objectId":"66f6d9bdca5af0e53f0d295a","week":17,"homeTeam":"LAR","guestTeam":"ARI","date":"2024-12-29T05:00Z"},{"objectId":"66f6d9bdca5af0e53f0d295b","week":17,"homeTeam":"NE","guestTeam":"LAC","date":"2024-12-29T05:00Z"},{"objectId":"66f6d9bdca5af0e53f0d295c","week":17,"homeTeam":"NYG","guestTeam":"IND","date":"2024-12-29T05:00Z"},{"objectId":"66f6d9bdca5af0e53f0d295d","week":17,"homeTeam":"WAS","guestTeam":"ATL","date":"2024-12-29T05:00Z"},{"objectId":"66f6d9bdca5af0e53f0d295e","week":17,"homeTeam":"BUF","guestTeam":"NYJ","date":"2024-12-29T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d295f","week":17,"homeTeam":"MIN","guestTeam":"GB","date":"2024-12-29T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2960","week":17,"homeTeam":"NO","guestTeam":"LV","date":"2024-12-29T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2961","week":17,"homeTeam":"TB","guestTeam":"CAR","date":"2024-12-29T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2962","week":17,"homeTeam":"JAX","guestTeam":"TEN","date":"2024-12-29T18:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2963","week":17,"homeTeam":"PHI","guestTeam":"DAL","date":"2024-12-29T21:25Z"},{"objectId":"66f6d9bdca5af0e53f0d2964","week":17,"homeTeam":"CLE","guestTeam":"MIA","date":"2024-12-30T01:20Z"},{"objectId":"66f6d9bdca5af0e53f0d2965","week":17,"homeTeam":"SF","guestTeam":"DET","date":"2024-12-31T01:15Z"},{"objectId":"66f6d9bdca5af0e53f0d2966","week":18,"homeTeam":"ATL","guestTeam":"CAR","date":"2025-01-05T05:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2967","week":18,"homeTeam":"DAL","guestTeam":"WAS","date":"2025-01-05T05:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2968","week":18,"homeTeam":"DEN","guestTeam":"KC","date":"2025-01-05T05:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2969","week":18,"homeTeam":"DET","guestTeam":"MIN","date":"2025-01-05T05:00Z"},{"objectId":"66f6d9bdca5af0e53f0d296a","week":18,"homeTeam":"GB","guestTeam":"CHI","date":"2025-01-05T05:00Z"},{"objectId":"66f6d9bdca5af0e53f0d296b","week":18,"homeTeam":"TEN","guestTeam":"HOU","date":"2025-01-05T05:00Z"},{"objectId":"66f6d9bdca5af0e53f0d296c","week":18,"homeTeam":"IND","guestTeam":"JAX","date":"2025-01-05T05:00Z"},{"objectId":"66f6d9bdca5af0e53f0d296d","week":18,"homeTeam":"LV","guestTeam":"LAC","date":"2025-01-05T05:00Z"},{"objectId":"66f6d9bdca5af0e53f0d296e","week":18,"homeTeam":"LAR","guestTeam":"SEA","date":"2025-01-05T05:00Z"},{"objectId":"66f6d9bdca5af0e53f0d296f","week":18,"homeTeam":"NE","guestTeam":"BUF","date":"2025-01-05T05:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2970","week":18,"homeTeam":"NYJ","guestTeam":"MIA","date":"2025-01-05T05:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2971","week":18,"homeTeam":"PHI","guestTeam":"NYG","date":"2025-01-05T05:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2972","week":18,"homeTeam":"ARI","guestTeam":"SF","date":"2025-01-05T05:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2973","week":18,"homeTeam":"PIT","guestTeam":"CIN","date":"2025-01-05T05:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2974","week":18,"homeTeam":"TB","guestTeam":"NO","date":"2025-01-05T05:00Z"},{"objectId":"66f6d9bdca5af0e53f0d2975","week":18,"homeTeam":"BAL","guestTeam":"CLE","date":"2025-01-05T05:00Z"}]';
  }
}
