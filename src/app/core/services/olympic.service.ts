import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { OlympicCountry } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private loading = new BehaviorSubject<boolean>(false);
  private olympics$ = new BehaviorSubject<any>(undefined);

  constructor(private http: HttpClient) { }

  loadInitialData() {
    this.loading.next(true);
    console.log('Début du chargement des données olympiques');
    return this.http.get<OlympicCountry[]>(this.olympicUrl).pipe(
      tap((value) => {
        console.log('Données reçues:', value);
        this.olympics$.next(value);
        this.loading.next(false);
        console.log('Chargement terminé');
      }),
      catchError((error) => {
        console.error('Erreur lors du chargement des données:', error);
        this.olympics$.next(null);
        this.loading.next(false);
        console.log('Chargement terminé avec erreur');
        return throwError(() => new Error('Erreur lors du chargement des données'));
      })
    );
  }

  isLoading() {
    return this.loading.asObservable();
  }

  isDataLoaded(): boolean {
    return this.olympics$.value !== null && this.olympics$.value !== undefined;
  }



  getOlympics() {
    return this.olympics$.asObservable();
  }

  getOlympicCountry(id: string): Observable<OlympicCountry | null> {

    return this.getOlympics().pipe(

      filter(olympics => olympics !== null && olympics !== undefined),

      map((olympics: OlympicCountry[]) => {

        const foundCountry = olympics.find((c: OlympicCountry) => c.id === +id);

        if (!foundCountry) {

          throw new Error('404 Not Found');

        }

        return foundCountry;

      })

    );

  }
}
