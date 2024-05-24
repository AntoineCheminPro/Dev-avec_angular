import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, HostListener } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { map, catchError, finalize } from 'rxjs/operators';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OlympicEvent } from 'src/app/core/models/OlympicEvent';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class HomeComponent implements OnInit {

  private subscription: Subscription = new Subscription();
  private loadingSubject = new BehaviorSubject<boolean>(true);
  private errorSubject = new BehaviorSubject<string | null>(null);
  public loading$ = this.loadingSubject.asObservable();
  public error$ = this.errorSubject.asObservable();
  public olympics$: Observable<OlympicEvent[]> | undefined;



  //Graph settings
  view: [number, number] = [700, 400];
  showLegend = true;
  showLabels = true;
  legendPosition: string = 'below';
  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: [
      '#5AA454', '#A10A28', '#C7B42C', '#AAAAAA',
      '#1F77B4', '#FF7F0E', '#2CA02C', '#D62728',
      '#9467BD', '#8C564B', '#E377C2', '#7F7F7F',
      '#BCBD22', '#17BECF'
    ]
  };

  constructor(private olympicService: OlympicService,
    private router: Router) {
    this.setView();
  }

  // Initialiser le composant
  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics().pipe(
      map((data) => {
        return data
          ? data.map((country: OlympicCountry) => {
            return {
              id: country.id,
              name: country.country,
              value: country.participations.reduce(
                (total, participation) => total + participation.medalsCount,
                0
              ),
              extra: { id: country.id }
            };
          })
          : [];
      }),
      catchError((error) => {
        this.errorSubject.next('Erreur lors du chargement des données');
        return of([]);
      }),
      finalize(() => this.loadingSubject.next(false))
    );

    this.subscription.add(
      this.olympicService.loadInitialData().subscribe({
        next: (data) => {
          this.loadingSubject.next(false);
        },
        error: (error) => {
          this.loadingSubject.next(false);
        }
      })
    );
  }

  // Rediriger vers la page de détail au clic sur un élément
  onSelect(event: OlympicEvent): void {
    const id = event.extra.id;
    if (id) {
      this.router.navigate(['/detail', id]);
    } else {
      console.error('ID is missing from the selected event');
    }
  }

  // Ajuster la vue en fonction de la taille de la fenêtre
  setView(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.view = [Math.min(width * 0.9, 600), Math.min(height * 0.7, 600)]; // Ajuster la hauteur pour une meilleure adaptation sur smartphone
    this.legendPosition = width < 600 ? 'below' : 'right';
  }

  // Nettoyer les abonnements lors de la destruction du composant
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}