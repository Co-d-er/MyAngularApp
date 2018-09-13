import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { RoomRoutingModule } from './room-routing.module';

@NgModule({
  imports: [RoomRoutingModule, SharedModule],
  declarations: [RoomRoutingModule.components]
})
export class RoomModule { }
