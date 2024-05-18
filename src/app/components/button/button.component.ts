import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})



export class ButtonComponent {
  @Input() buttonText: string = 'Cliquez ici';
  @Output() buttonClick = new EventEmitter<void>();


  constructor(private router: Router
  ) {}

  onClick(): void {
    this.router.navigate(['/']);
  }


}