import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CandidateService } from '../../services/candidate.service';
import { Candidate } from '../../interfaces/candidate';

@Component({
  selector: 'app-candidates',
  standalone: true,
  imports: [],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.scss'
})
export class CandidatesComponent implements OnInit, OnDestroy {
  private routeSub: any;
  toastr = inject(ToastrService)
  route = inject(ActivatedRoute);
  candidateService = inject(CandidateService)
  candidates!: Candidate[];

  isLoading: boolean = false;
  eid!: string

  getCandidates(id: string) {
    this.isLoading = true;
    this.candidateService.getCandidates(id).subscribe({
      next: (result) => {
        this.isLoading = false;
        this.candidates = result.data
        console.log(this.candidates);
      },
      error: (error) => console.log(error.message),
    });
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.isLoading = true;
      this.eid = params['id'];
      this.getCandidates(this.eid);
    })
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
