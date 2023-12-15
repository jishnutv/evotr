import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { VoterService } from '../../../services/voter.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiErrorResponse } from '../../../interfaces/api-error-response';

interface PasswordUpdate {
  current_password: string,
  password: string
}

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  updatePasswordForm: FormGroup;
  isLoading: boolean = false;
  voterId!: string
  data!: PasswordUpdate;
  private routeSub: any;

  formBuilder = inject(FormBuilder);
  voterService = inject(VoterService)
  toastr = inject(ToastrService)
  router = inject(Router)
  route = inject(ActivatedRoute);

  constructor() {
    this.updatePasswordForm = this.formBuilder.group(
      {
        current_password: ['', [Validators.required, Validators.minLength(6)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirm_password: ['', [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(control: AbstractControl) {
    return control.get('password')?.value ===
      control.get('confirm_password')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit() {
    this.isLoading = true;
    this.data = this.updatePasswordForm.value;
    this.voterService.changePassword(this.data, this.voterId).subscribe({
      next: (result) => {
        console.log(result);
        this.isLoading = false;
        this.updatePasswordForm.reset();
        this.toastr.success('Your password has been changed successfully');
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
      this.voterId = params['id'];
    })
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
