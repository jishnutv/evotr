import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Election } from '../../../interfaces/election';
import { ElectionService } from '../../../services/election.service';
import { ToastrService } from 'ngx-toastr';
import { ApiErrorResponse } from '../../../interfaces/api-error-response';

@Component({
  selector: 'app-create-election',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule],
  templateUrl: './create-election.component.html',
  styleUrl: './create-election.component.scss'
})
export class CreateElectionComponent {
  electionForm: FormGroup;
  isLoading: boolean = false;
  data!: Election;

  formBuilder = inject(FormBuilder);
  electionService = inject(ElectionService)
  toastr = inject(ToastrService)
  route = inject(Router);

  constructor() {
    this.electionForm = this.formBuilder.group(
      {
        title: ['', [Validators.required, Validators.minLength(3)]],
      }
    );
  }

  onSubmit() {
    this.isLoading = true;
    this.data = this.electionForm.value;

    this.electionService.createElection(this.data).subscribe({
      next: (result) => {
        this.isLoading = false;
        this.toastr.success('New election created');
        this.route.navigate(['/admin/elections']);
      },
      error: (e) => {
        this.isLoading = false;
        const errRes: ApiErrorResponse = e.error;
        this.toastr.error(errRes.error.message);
      },
    });
  }
}
