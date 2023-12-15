import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ElectionService } from '../../../services/election.service';
import { Election } from '../../../interfaces/election';

@Component({
  selector: 'app-elections',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './elections.component.html',
  styleUrl: './elections.component.scss'
})
export class ElectionsComponent implements OnInit {
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
