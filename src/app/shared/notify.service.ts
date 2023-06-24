import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private toastr: ToastrService) {}

  showError(message: string, title: string) {
    this.toastr.error(message, title);
  }

  showSuccess(message: string, title: string) {
    this.toastr.success(message, title);
  }

  showUserState(message: string, title: string) {
    this.toastr.info(message, title);
  }
}
