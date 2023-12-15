import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Voter } from '../../../interfaces/voter';
import { VoterService } from '../../../services/voter.service';

@Component({
  selector: 'app-voters',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './voters.component.html',
  styleUrl: './voters.component.scss'
})
export class VotersComponent implements OnInit {
  voters!: Voter[];
  isLoading = false;

  voterService = inject(VoterService);

  getVoters() {
    this.isLoading = true;
    this.voterService.getVoters().subscribe({
      next: (result) => {
        this.isLoading = false;
        this.voters = result.data

        console.log(this.voters);
      },
      error: (error) => console.log(error.message),
    });
  }

ngOnInit(): void {
  this.getVoters();
}
}
