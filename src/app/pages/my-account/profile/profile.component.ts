import { Component, OnInit } from '@angular/core';
import { VoterService } from '../../../services/voter.service';
import { Voter } from '../../../interfaces/voter';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  voter!: Voter;
  isLoading = true;

  constructor(private voterService: VoterService) {

  }

  getVoter() {
    this.voterService.getVoter().subscribe({
      next: (result) => {
        this.isLoading = false;
        this.voter = result.data
        console.log(result.data)
      },
      error: (error) => console.log(error.message),
    });
  }

  ngOnInit(): void {
    this.getVoter();
  }
}
