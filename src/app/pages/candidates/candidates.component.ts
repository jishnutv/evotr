import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CandidateService } from '../../services/candidate.service';
import { Candidate } from '../../interfaces/candidate';
import { VoterService } from '../../services/voter.service';

@Component({
  selector: 'app-candidates',
  standalone: true,
  imports: [],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.scss'
})
export class CandidatesComponent implements OnInit, OnDestroy {
  private routeSub: any;
  user_id!: string;
  toastr = inject(ToastrService)
  route = inject(ActivatedRoute);
  candidateService = inject(CandidateService)
  voterService = inject(VoterService)
  candidates!: Candidate[];
  isVoted!:boolean;
  isLoading: boolean = false;
  eid!: string

  getCandidates(id: string) {
    this.isLoading = true;
    this.candidateService.getCandidates(id).subscribe({
      next: (result) => {
        this.isLoading = false;
        this.candidates = result.data
      },
      error: (error) => console.log(error.message),
    });
  }

  addVote(election_id: string, candidate_id: string) {
    this.isLoading = true;
    
    this.voterService.addVote({ user_id: this.user_id, election_id, candidate_id }).subscribe({
      next: (result) => {
        this.isLoading = false;
        this.isVoted = true;
        this.toastr.success('Success');
      },
      error: (error) => console.log(error.message),
    });
  }

  checkVote(eid:string, id:string){
    this.user_id = localStorage.getItem('user_id') ?? '';
    this.voterService.checkVote(eid, id).subscribe({
      next: (result) => {
        if(result.success) {
          this.isVoted = true;
        }
      },
      error: (error) => console.log(error.message),
    });
  }

  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id') ?? '';
    this.routeSub = this.route.params.subscribe(params => {
      this.isLoading = true;
      this.eid = params['id'];
      this.checkVote(this.eid, this.user_id);
      this.getCandidates(this.eid);
    })
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
