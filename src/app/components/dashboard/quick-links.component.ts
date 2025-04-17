import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-quick-links',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './quick-links.component.html',
 //styleUrls: ['./quick-links.component.scss']
})
export class QuickLinksComponent {
  links = [
    { label: 'Goals', route: '/goals'},
    { label: 'Meals', route: '/meals'},
    { label: 'Calendar', route: '/calendar' },
    { label: 'Search', route: '/search' }
  ];
}

