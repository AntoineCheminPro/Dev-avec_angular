import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [HeaderComponent, RouterModule],
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private olympicService: OlympicService) { }

  // l'utilisation de take(1) permet de ne pas s'abonner à l'observable, il n'est pas nécessaire de l'unsubscribe
  ngOnInit(): void {
    this.olympicService.loadInitialData().pipe(take(1)).subscribe();
  }

  
}
