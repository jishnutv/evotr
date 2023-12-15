import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-elections',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './elections.component.html',
  styleUrl: './elections.component.scss'
})
export class ElectionsComponent {

}
