import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { RoomsRoutingModule } from './rooms-routing.module';

@NgModule({
  imports: [RoomsRoutingModule, SharedModule],
  declarations: [RoomsRoutingModule.components]
})
export class RoomsModule { }
