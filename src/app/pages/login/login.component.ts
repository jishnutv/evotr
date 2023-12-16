import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { ApiErrorResponse } from '../../interfaces/api-error-response';

interface loginForm {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  formBuilder = inject(FormBuilder);
  toastr = inject(ToastrService);
  router = inject(Router);
  authService = inject(AuthService);

  loginForm: FormGroup;
  isLoading: boolean = false;
  data!: loginForm;

  constructor() {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      }
    );
  }

  onSubmit() {
    this.isLoading = true;
    this.data = this.loginForm.value;
    this.authService.loginVoter(this.data).subscribe({
      next: (result) => {
        localStorage.setItem('user_token', result.access_token);
        this.isLoading = false;
        this.loginForm.reset();
        this.toastr.success('Login successful.');
        this.router.navigate(['/home']);
      },
      error: (e) => {
        this.isLoading = false;
        const errRes: ApiErrorResponse = e.error;
        this.toastr.error(errRes.error.message);
      },
    });
  }
}
