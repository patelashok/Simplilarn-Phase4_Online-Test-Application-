import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifyService } from '../shared/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private notifyService: NotifyService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ],
      ],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.notifyService.showError('All fields are Mandatory', ' Quiz App');
    } else {
      this.http.get<any>('http://localhost:3000/signUp').subscribe(
        (res) => {
          const user = res.find((a: any) => {
            return (
              a.userName === this.loginForm.value.email &&
              a.userPassword === this.loginForm.value.password
            );
          });
          if (user) {
            this.notifyService.showSuccess('Success', 'Quiz App');
            this.loginForm.reset();
            this.router.navigate(['/welcome']);
          } else {
            this.notifyService.showError('User not found', ' Quiz App');
          }
        },
        (err) => {
          this.notifyService.showError('Failure', ' Quiz App');
        }
      );
    }
  }
}
