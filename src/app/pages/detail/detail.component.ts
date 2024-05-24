import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, HostListener } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { CountryData } from 'src/app/core/models/CountryData';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [NgxChartsModule, ButtonComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DetailComponent implements OnInit {

  public id: string = '';
  // BehaviorSubject pour les données du pays
  public country$: BehaviorSubject<CountryData[]> = new BehaviorSubject<CountryData[]>([]);
  // BehaviorSubject pour le chargement
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // BehaviorSubject pour les erreurs
  private subscription: Subscription = new Subscription();
  public error$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.setView();
  }

  //Graph settings
  public view: [number, number] = [700, 400];
  public showLegend = false;
  public showLabels = true;
  public legendPosition: string = 'below';
  public colorScheme: Color = {
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

  // Initialiser le composant
  ngOnInit() {
    this.subscription.add(
      this.route.params.pipe(
        map(params => {
          return params['id'];
        })
      ).subscribe(id => {
        this.loadCountryData(id);
      })
    );
  }

  // Charger les données du pays
  loadCountryData(id: string) {
    this.loading$.next(true);
    this.error$.next(null);

    // Récupérer les données du pays
    this.olympicService.getOlympicCountry(id).subscribe({
      // Gérer les données
      next: (country: OlympicCountry | null) => {
        if (country !== null) {
          const transformedData = [{
            name: country.country,
            series: country.participations.map(participation => ({
              name: participation.year,
              value: participation.medalsCount
            }))
          }];
          this.country$.next(transformedData);
        
        } else {
          console.error("Aucun pays trouvé avec l'ID spécifié.");
          this.error$.next("Aucun pays trouvé avec l'ID spécifié.");
        }
        this.loading$.next(false);
      },
      // Gérer les erreurs
      error: (error) => {
        console.error("Erreur lors de la récupération des données du pays:", error);
        this.error$.next("Une erreur est survenue lors de la récupération des données.");
        this.loading$.next(false);
      },
      complete: () => {
        this.loading$.next(false);
      }
    });

  }
  // Naviguer vers la page de détail lors de la sélection d'un élément
  onSelect(event: any): void {
    console.log(event);
  }

  // Nettoyer les abonnements lors de la destruction du composant
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  // gestion de la taille de la fenêtre
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.setView();
  }

  // Définir la vue en fonction de la taille de la fenêtre
  formatXAxisTick(year: number): string {
    // Afficher l'étiquette seulement si l'année est un multiple de 4
    return year % 4 === 0 ? year.toString() : '';
  }

  // Définir la vue en fonction de la taille de la fenêtre
  setView(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.view = [Math.min(width * 0.9, 600), Math.min(height * 0.7, 600)];
    this.legendPosition = width < 600 ? 'below' : 'right';
  }
}