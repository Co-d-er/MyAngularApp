import { Injectable } from '@angular/core';

import { IRoom, IOrder } from '../../shared/interfaces';

@Injectable()
export class TrackByService {

  room(index: number, room: IRoom) {
    return room.id;
  }

  order(index: number, order: IOrder) {
    return index;
  }



}
