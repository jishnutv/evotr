import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Candidate } from '../../../interfaces/candidate';
import { CandidateService } from '../../../services/candidate.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ApiErrorResponse } from '../../../interfaces/api-error-response';
import { ElectionService } from '../../../services/election.service';
import { Election } from '../../../interfaces/election';

@Component({
  selector: 'app-create-candidate',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './create-candidate.component.html',
  styleUrl: './create-candidate.component.scss'
})
export class CreateCandidateComponent implements OnInit {
  candidateForm: FormGroup;
  isLoading: boolean = false;
  data!: Candidate;
  elections!: Election[];

  formBuilder = inject(FormBuilder);
  candidateService = inject(CandidateService)
  electionService = inject(ElectionService)
  toastr = inject(ToastrService)
  route = inject(Router);

  constructor() {
    this.candidateForm = this.formBuilder.group(
      {
        election_id: ['', Validators.required],
        fname: ['', [Validators.required, Validators.minLength(3)]],
        lname: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]],
      }
    );
  }

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

  onSubmit() {
    this.isLoading = true;
    this.data = this.candidateForm.value;

    this.candidateService.createCandidate(this.data).subscribe({
      next: (result) => {
        this.isLoading = false;
        this.toastr.success('New candidate created');
        this.candidateForm.reset();
      },
      error: (e) => {
        this.isLoading = false;
        const errRes: ApiErrorResponse = e.error;
        this.toastr.error(errRes.error.message);
      },
    });
  }

  ngOnInit(): void {
    this.getElections();
  }
}
