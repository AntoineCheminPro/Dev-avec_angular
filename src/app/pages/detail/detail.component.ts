import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, HostListener } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { ButtonComponent } from 'src/app/components/button/button.component';

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
  public country: OlympicCountry = {} as OlympicCountry;
  public olympics$: BehaviorSubject<OlympicCountry[]> = new BehaviorSubject<OlympicCountry[]>([]);
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public country$: Observable<{ name: string; series: { value: number; name: number; }[] }[] | []> = new BehaviorSubject([]);

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.setView();
  }

  view: [number, number] = [700, 400];
  showLegend = false;
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

  ngOnInit() {
    this.country$ = this.route.params.pipe(
      map(params => params['id']), // Extrait l'ID du pays à partir des paramètres de la route
      switchMap(id => this.olympicService.getOlympicCountry(id)), // Utilise l'ID pour obtenir les données du pays via le service olympique
      map(country => {
        return [{ // Transforme les données du pays en format adapté pour l'affichage
          name: country!.country,
          series: country!.participations.map(participation => ({
            name: participation.year, // Année de participation
            value: participation.medalsCount // Nombre de médailles obtenues
          }))
        }];
      }),
      catchError(error => {
        if (error.message === '404 Not Found') {
          this.router.navigate(['/error']);
        }
        return of([]); // Retourne un tableau vide en cas d'erreur
      })
    );
  }

  loadCountryData(id: string) {
    this.olympicService.getOlympicCountry(id).subscribe((country: OlympicCountry | null) => {
      if (country !== null) {
        this.country = country;
        console.log(country);
      } else {
        console.error("Aucun pays trouvé avec l'ID spécifié.");
      }
    });
  }

  formatXAxisTick(year: number): string {
    // Afficher l'étiquette seulement si l'année est un multiple de 4
    return year % 4 === 0 ? year.toString() : '';
  }

  onSelect(event: any): void {
    console.log(event);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.setView();
  }

  setView(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.view = [Math.min(width * 0.9, 600), Math.min(height * 0.7, 600)];
    this.legendPosition = width < 600 ? 'below' : 'right';
  }
}