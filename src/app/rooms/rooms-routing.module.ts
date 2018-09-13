import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoomsComponent } from './rooms.component';
import { RoomsCardComponent } from './rooms-card.component';
import { RoomsGridComponent } from './rooms-grid.component';

const routes: Routes = [
  { path: '', component: RoomsComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class RoomsRoutingModule {
  static components = [ RoomsComponent, RoomsCardComponent, RoomsGridComponent ];
}
