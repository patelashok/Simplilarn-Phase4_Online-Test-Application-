import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Contact } from '../model/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private mailApi = 'https://mailthis.to/raju';

  constructor(private http: HttpClient) {}

  PostMessage(input: any) {
    return this.http.post(this.mailApi, input, { responseType: 'text' }).pipe(
      map(
        (response) => {
          if (response) {
            return response;
          } else {
            return null;
          }
        },
        (error: any) => {
          return error;
        }
      )
    );
  }
}
