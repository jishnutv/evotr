import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Voter } from '../../../interfaces/voter';
import { VoterService } from '../../../services/voter.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {

  editForm: FormGroup;
  isLoading: boolean = false;
  data!: Voter;

  formBuilder = inject(FormBuilder);
  voterService = inject(VoterService)
  toastr = inject(ToastrService)
  router = inject(Router)

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

    console.log(this.data);
    // this.voterService.regVoter(this.data).subscribe({
    //   next: (result) => {
    //     this.isLoading = false;
    //     this.regForm.reset();
    //     this.toastr.success('Congratulations! Your registration was successful.');
    //     this.router.navigate(['/login']);
    //   },
    //   error: (e) => {
    //     this.isLoading = false;
    //     const errRes: ApiErrorResponse = e.error;
    //     this.toastr.error(errRes.error.message);
    //   },
    // });
  }
}