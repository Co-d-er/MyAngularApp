import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { IRoom } from '../shared/interfaces';
import { TrackByService } from '../core/services/trackby.service';

@Component({
  selector: 'app-rooms-card',
  templateUrl: './rooms-card.component.html',
  styleUrls: [ './rooms-card.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsCardComponent implements OnInit {

  @Input() rooms: IRoom[] = [];

  constructor(public trackbyService: TrackByService) { }

  ngOnInit() {

  }

}

