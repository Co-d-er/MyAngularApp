import { Component, OnInit } from '@angular/core';

import { DataService } from '../core/services/data.service';
import { IRoom, IPagedResults } from '../shared/interfaces';
import { FilterService } from '../core/services/filter.service';
import { LoggerService } from '../core/services/logger.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html'
})
export class RoomsComponent implements OnInit {

  title: string;
  filterText: string;
  rooms: IRoom[] = [];
  filteredrooms: IRoom[] = [];
  displayMode: DisplayModeEnum;
  displayModeEnum = DisplayModeEnum;
  totalRecords = 0;
  pageSize = 3;

  constructor(private dataService: DataService,
    private filterService: FilterService,
    private logger: LoggerService) { }

  ngOnInit() {
    this.title = 'Rooms';
    this.filterText = 'Filter Rooms:';
    this.displayMode = DisplayModeEnum.Card;

    this.getroomsPage(1);
  }

  changeDisplayMode(mode: DisplayModeEnum) {
      this.displayMode = mode;
  }

  pageChanged(page: number) {
    this.getroomsPage(page);
  }

  getroomsPage(page: number) {
    this.dataService.getRoomsPage((page - 1) * this.pageSize, this.pageSize)
        .subscribe((response: IPagedResults<IRoom[]>) => {
          this.rooms = this.filteredrooms = response.results;
          this.totalRecords = response.totalRecords;
        },
        (err: any) => this.logger.log(err),
        () => this.logger.log('getroomsPage() retrieved rooms for page: ' + page));
  }

  filterChanged(data: string) {
    if (data && this.rooms) {
        data = data.toUpperCase();
        const props = ['name', 'city', 'state.name'];
        this.filteredrooms = this.filterService.filter<IRoom>(this.rooms, data, props);
    } else {
      this.filteredrooms = this.rooms;
    }
  }
}

enum DisplayModeEnum {
  Card = 0,
  Grid = 1,
  Map = 2
}
