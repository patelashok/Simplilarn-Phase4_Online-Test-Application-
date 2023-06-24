import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotifyService } from '../shared/notify.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  @ViewChild('name') nameKey!: ElementRef;
  constructor(private notifyService: NotifyService, private router: Router) {}

  ngOnInit() {}

  logoutUser() {
    this.notifyService.showUserState(
      'user session expired, try login again',
      'Quiz App'
    );
    this.router.navigate(['']);
  }

  startQuiz() {
    localStorage.setItem('name', this.nameKey.nativeElement.value);
    if (localStorage.getItem('name') === '') {
      this.notifyService.showError(
        'Name field should not be empty',
        'Please enter name to proceed'
      );
    } else {
      this.notifyService.showSuccess('Success', 'Quiz App');
      this.router.navigate(['/question']);
    }
  }
}
