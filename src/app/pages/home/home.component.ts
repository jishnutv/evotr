import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Election } from '../../interfaces/election';
import { ElectionService } from '../../services/election.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  elections!: Election[];
  isLoading = false;

  electionService = inject(ElectionService);

  getElections() {
    this.isLoading = true;
    this.electionService.getElections().subscribe({
      next: (result) => {
        this.isLoading = false;
        this.elections = result.data
      },
      error: (error) => console.log(error.message),
    });
  }

  ngOnInit(): void {
    this.getElections();
  }
}
