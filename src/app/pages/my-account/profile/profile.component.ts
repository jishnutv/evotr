import { Component, OnInit } from '@angular/core';
import { VoterService } from '../../../services/voter.service';
import { Voter } from '../../../interfaces/voter';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  voter!: Voter;
  isLoading = true;

  constructor(private voterService: VoterService) {

  }

  getVoter() {
    this.voterService.getVoter('1').subscribe({
      next: (result) => {
        this.isLoading = false;
        this.voter = result.data
      },
      error: (error) => console.log(error.message),
    });
  }

  ngOnInit(): void {
    this.getVoter();
  }
}
