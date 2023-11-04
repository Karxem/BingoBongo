import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BingoComponent } from './pages/bingo/bingo.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'bingo', component: BingoComponent },
  // { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
