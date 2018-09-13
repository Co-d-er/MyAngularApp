import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules, NoPreloading } from '@angular/router';

import { PreloadModulesStrategy } from './core/strategies/preload-modules.strategy';

const app_routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/rooms' },
  { path: 'rooms/:id', loadChildren: './room/room.module#RoomModule' },
  { path: 'rooms', loadChildren: './rooms/rooms.module#RoomsModule' },
  { path: '**', pathMatch: 'full', redirectTo: '/rooms' } // catch any unfound routes and redirect to home page
];

@NgModule({
  imports: [ RouterModule.forRoot(app_routes, { preloadingStrategy: PreloadAllModules }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
