import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicijativaComponent } from './components/inicijativa/inicijativa.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ZagadjenostComponent } from './components/zagadjenost/zagadjenost.component';

const routes: Routes = [
  { path: 'inicijativa', component: InicijativaComponent },
  { path: 'lebdece-cestice', component: InicijativaComponent },
  { path: 'zagadjenost', component: ZagadjenostComponent },
  { path: '**', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
