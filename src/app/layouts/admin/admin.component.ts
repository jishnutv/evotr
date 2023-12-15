import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { AdminNavbarComponent } from '../../components/admin-navbar/admin-navbar.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, AdminNavbarComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
