import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { VoterService } from '../../services/voter.service';
import { ToastrService } from 'ngx-toastr';
import { ApiErrorResponse } from '../../interfaces/api-error-response';

interface RegForm {
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  regForm: FormGroup;
  isLoading: boolean = false;
  data!: RegForm;

  constructor(
    private formBuilder: FormBuilder,
    private voterService: VoterService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.regForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
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
    this.data = this.regForm.value;
    this.voterService.regVoter(this.data).subscribe({
      next: (result) => {
        this.isLoading = false;
        this.regForm.reset();
        this.toastr.success('Congratulations! Your registration was successful.');
        this.router.navigate(['/login']);
      },
      error: (e) => {
        this.isLoading = false;
        const errRes: ApiErrorResponse = e.error;
        this.toastr.error(errRes.error.message);
      },
    });
  }
}
