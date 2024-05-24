import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { OlympicCountry } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private loading = new BehaviorSubject<boolean>(false);
  private olympics$ = new BehaviorSubject<OlympicCountry[] | null>(null);

  constructor(private http: HttpClient) { }

  // Charger les données initiales
  loadInitialData(): Observable<any> {
    this.loading.next(true); // Début du chargement
    return this.http.get<OlympicCountry[]>(this.olympicUrl).pipe(
      map((data) => {
        this.olympics$.next(data);
        this.loading.next(false); // Fin du chargement
        return data;
      }),
      catchError((error) => {
        console.error('Error loading initial data', error);
        this.loading.next(false); // Fin du chargement même en cas d'erreur
        return of(null);
      })
    );
  }
  isLoading() {
    return this.loading.asObservable();
  }

  // Vérifier si les données sont chargées
  isDataLoaded(): boolean {
    return this.olympics$.value !== null && this.olympics$.value !== undefined;
  }

  // Récupérer les données des pays
  getOlympics(): Observable<OlympicCountry[] | null> {
    return this.olympics$.asObservable();
  }

  // Récupérer les données d'un pays
  getOlympicCountry(id: string): Observable<OlympicCountry | null> {
    return this.getOlympics().pipe(
      filter((olympics): olympics is OlympicCountry[] => olympics !== null && olympics !== undefined),
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

