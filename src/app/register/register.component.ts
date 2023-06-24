import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifyService } from '../shared/notify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  userRegisterForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private notifyService: NotifyService
  ) {}

  ngOnInit() {
    this.userRegisterForm = this.formBuilder.group({
      userFirstName: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z][a-zA-Z ]+'),
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      userLastName: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z][a-zA-Z]+'),
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15),
        ],
      ],
      userPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ],
      ],
      userContactNo: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.userRegisterForm.invalid) {
      this.notifyService.showError('All fields are Mandatory', ' Quiz App');
    } else {
      this.http
        .post<any>('http://localhost:3000/signUp', this.userRegisterForm.value)
        .subscribe(
          (res) => {
            this.notifyService.showSuccess(
              'User Registered Successfully',
              'Quiz App'
            );
            this.userRegisterForm.reset();
            this.router.navigate(['']);
          },
          (err) => {
            this.notifyService.showError('failure', 'Quiz App');
          }
        );
    }
  }

  cancel() {
    this.router.navigate(['/login']);
  }
}
