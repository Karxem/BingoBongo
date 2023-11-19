import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BingoComponent } from './pages/bingo/bingo.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './shared/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginFormComponent } from './components/login/login-form.component';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'bingo', component: BingoComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] }, 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
