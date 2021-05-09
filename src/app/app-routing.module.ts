import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicijativaComponent } from './components/inicijativa/inicijativa.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ZagadjenostComponent } from './components/zagadjenost/zagadjenost.component';
import { LebdeceCesticeComponent } from './components/lebdece-cestice/lebdece-cestice.component';

const routes: Routes = [
  { path: 'inicijativa', component: InicijativaComponent },
  { path: 'lebdece-cestice', component: LebdeceCesticeComponent },
  { path: 'zagadjenost', component: ZagadjenostComponent },
  { path: '**', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
