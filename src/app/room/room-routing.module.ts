import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoomComponent } from './room.component';
import { RoomDetailsComponent } from './room-details.component';
import { RoomEditComponent } from './room-edit.component';
import { CanActivateGuard } from './can-activate.guard';
import { CanDeactivateGuard } from './can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: RoomComponent,
    children: [
      { path: 'details', component: RoomDetailsComponent },
      {
        path: 'edit',
        component: RoomEditComponent,
        canActivate: [CanActivateGuard],
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CanActivateGuard, CanDeactivateGuard]
})
export class RoomRoutingModule {
  static components = [RoomComponent, RoomDetailsComponent, RoomEditComponent];
}

