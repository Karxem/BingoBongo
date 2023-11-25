import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BingoComponent } from './pages/bingo/bingo.component';
import { AuthGuard } from './shared/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginFormComponent } from './components/login/login-form.component';
import { RegisterFormComponent } from './components/register/register-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'bingo', component: BingoComponent, canActivate: [AuthGuard] },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
