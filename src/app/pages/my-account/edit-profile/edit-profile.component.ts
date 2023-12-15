import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Voter } from '../../../interfaces/voter';
import { VoterService } from '../../../services/voter.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiErrorResponse } from '../../../interfaces/api-error-response';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit, OnDestroy {

  editForm: FormGroup;
  isLoading: boolean = false;
  data!: Voter;
  voterId!: string
  private routeSub: any;

  formBuilder = inject(FormBuilder);
  voterService = inject(VoterService)
  toastr = inject(ToastrService)
  router = inject(Router)
  route = inject(ActivatedRoute);

  constructor() {
    this.editForm = this.formBuilder.group(
      {
        fname: ['', [Validators.required, Validators.minLength(3)]],
        lname: ['', [Validators.required, Validators.minLength(3)]],
        phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]],
      }
    );
  }

  onSubmit() {
    this.isLoading = true;
    this.data = this.editForm.value;
    this.voterService.updateVoter(this.data, this.voterId).subscribe({
      next: (result) => {
        this.isLoading = false;
        this.toastr.success('Your profile updated.');
      },
      error: (e) => {
        this.isLoading = false;
        const errRes: ApiErrorResponse = e.error;
        this.toastr.error(errRes.error.message);
      },
    });
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.isLoading = true;
      this.voterId = params['id'];
      this.voterService.getVoter(this.voterId).subscribe({
        next: (result) => {
          this.isLoading = false;
          this.editForm.setValue({
            fname: result.data.fname,
            lname: result.data.lname,
            phone: result.data.phone,
          });
        },
        error: (error) => console.log(error.message),
      });
    })
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}