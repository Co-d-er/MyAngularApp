import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { IRoom } from '../shared/interfaces';
import { DataService } from '../core/services/data.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {

  room: IRoom;
  mapEnabled: boolean;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.route.parent.params.subscribe((params: Params) => {
      const id = +params['id'];
      if (id) {
        this.dataService.getRoom(id)
          .subscribe((room: IRoom) => {
            this.room = room;
            this.mapEnabled = true;
          });
      }
    });
  }


}
