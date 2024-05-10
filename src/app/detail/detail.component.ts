import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { map } from 'rxjs/operators';
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

  public olympics$: Observable<any> = this.olympicService.getOlympics().pipe(
    map((data) => {
      return data
        ? data.map((country: OlympicCountry) => ({
          name: country.country,
          value: country.participations.reduce(
            (total, participation) => total + participation.medalsCount,
            0
          ),
        }))
        : [];
    })
  );

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

  constructor(private olympicService: OlympicService) {
    this.setView();
  }

  ngOnInit(): void {
    this.olympicService.loadInitialData().subscribe();
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
    this.view = [Math.min(width * 0.9, 600), Math.min(height * 0.7, 600)]; // Ajuster la hauteur pour une meilleure adaptation sur smartphone
    this.legendPosition = width < 600 ? 'below' : 'right';
  }
}
