import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../shared/contact.service';
import { NotifyService } from '../shared/notify.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent {
  contactForm: FormGroup;
  submitted: boolean = false;
  emailRegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private contactService: ContactService,
    private notifyService: NotifyService
  ) {}

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      userName: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z][a-zA-Z ]+'),
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      email: ['', [Validators.required, Validators.pattern(this.emailRegEx)]],
      userContactNo: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
      comment: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
        ],
      ],
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit(contactForm) {
    this.submitted = true;
    if (this.contactForm.invalid) {
      this.notifyService.showError('Please enter all the details', 'Quiz App');
    } else {
      this.notifyService.showSuccess('Happy', 'QuizApp');
      this.contactService.PostMessage(FormData).subscribe(
        (response) => {
          this.router.navigate(['/success']);
          console.log(response);
        },
        (error) => {
          console.warn(error.responseText);
          console.log({ error });
        }
      );
      this.contactForm.reset();
    }
  }

  cancel() {
    this.router.navigate(['']);
  }
}
