import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { QuestionComponent } from './question/question.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AddressComponent } from './address/address.component';
import { SuccessComponent } from './success/success.component';
import { NotecardComponent } from './notecard/notecard.component';

const routes: Routes = [
  { path: '', component: NavbarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user-register', component: RegisterComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'question', component: QuestionComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'address', component: AddressComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'note', component: NotecardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
