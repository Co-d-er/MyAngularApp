import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { SorterService } from '../core/services/sorter.service';
import { TrackByService } from '../core/services/trackby.service';
import { IRoom } from '../shared/interfaces';

@Component({
  selector: 'app-rooms-grid',
  templateUrl: './rooms-grid.component.html',
  styleUrls: ['./rooms-grid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsGridComponent implements OnInit {

  @Input() rooms: IRoom[] = [];

  constructor(private sorterService: SorterService, public trackbyService: TrackByService) { }

  ngOnInit() {

  }

  sort(prop: string) {
    this.sorterService.sort(this.rooms, prop);
  }

}
