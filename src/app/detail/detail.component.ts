import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, HostListener } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [NgxChartsModule],
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
    private route: ActivatedRoute
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
      map(params => params['id']),
      switchMap(id => this.olympicService.getOlympicCountry(id)),
      map(country => {
        return [{
          name: country!.country,
          series: country!.participations.map(participation => ({
            name: participation.year,
            value: participation.medalsCount
          }))
        }];
      }),
      catchError(error => {
        console.error("Erreur lors de la récupération des données du pays:", error);
        return of([]);
      })
    );
  }

  loadCountryData(id: string) {
    console.log('Chargement des données du pays avec l\'ID:', id);
    this.olympicService.getOlympicCountry(id).subscribe((country: OlympicCountry | null) => {
      if (country !== null) {
        this.country = country;
        console.log(country);
      } else {
        console.error("Aucun pays trouvé avec l'ID spécifié.");
      }
    });
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
