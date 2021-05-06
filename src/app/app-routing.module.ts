import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { MapComponent } from './components/map/map.component';

const routes: Routes = [
  { path: 'inicijativa', component: AboutComponent },
  { path: 'zasto-mjerimo', component: AboutComponent },
  { path: 'legenda', component: AboutComponent },
  { path: '**', component: MapComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
