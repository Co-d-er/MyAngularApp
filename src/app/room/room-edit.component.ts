import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { DataService } from '../core/services/data.service';
import { ModalService, IModalContent } from '../core/modal/modal.service';
import { IRoom, IState } from '../shared/interfaces';
import { GrowlerService, GrowlerMessageType } from '../core/growler/growler.service';
import { LoggerService } from '../core/services/logger.service';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit {

  room: IRoom =
    {
      id: 0,
      name: '',
      avatar: '',
      address: '',
      city: '',
      state: {
        abbreviation: '',
        name: ''
      },
      area: 0,
      bed_type: '',
      price: 0
    };
  states: IState[];
  errorMessage: string;
  deleteMessageEnabled: boolean;
  operationText = 'Insert';
  @ViewChild('roomForm') roomForm: NgForm;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private growler: GrowlerService,
    private modalService: ModalService,
    private logger: LoggerService) { }

  ngOnInit() {
    this.route.parent.params.subscribe((params: Params) => {
      const id = +params['id'];
      if (id !== 0) {
        this.operationText = 'Update';
        this.getroom(id);
      }
    });

    this.dataService.getStates().subscribe((states: IState[]) => this.states = states);
  }

  getroom(id: number) {
    this.dataService.getRoom(id).subscribe((room: IRoom) => {
      this.room = room;
    });
  }

  submit() {
    if (this.room.id === 0) {
      this.dataService.insertRoom(this.room)
        .subscribe((insertedroom: IRoom) => {
          if (insertedroom) {
            this.roomForm.form.markAsPristine();
            this.router.navigate(['/rooms']);
          } else {
            const msg = 'Unable to insert room';
            this.growler.growl(msg, GrowlerMessageType.Danger);
            this.errorMessage = msg;
          }
        },
          (err: any) => this.logger.log(err));
    } else {
      this.dataService.updateRoom(this.room)
        .subscribe((status: boolean) => {
          if (status) {
            this.roomForm.form.markAsPristine();
            this.growler.growl('Operation performed successfully.', GrowlerMessageType.Success);
            this.router.navigate(['/rooms']);
          } else {
            const msg = 'Unable to update room';
            this.growler.growl(msg, GrowlerMessageType.Danger);
            this.errorMessage = msg;
          }
        },
          (err: any) => this.logger.log(err));
    }
  }

  cancel(event: Event) {
    event.preventDefault();
    // Route guard will take care of showing modal dialog service if data is dirty
    this.router.navigate(['/rooms']);
  }

  delete(event: Event) {
    event.preventDefault();
    this.dataService.deleteRoom(this.room.id)
      .subscribe((status: boolean) => {
        if (status) {
          this.router.navigate(['/rooms']);
        } else {
          this.errorMessage = 'Unable to delete room';
        }
      },
        (err) => this.logger.log(err));
  }

  canDeactivate(): Promise<boolean> | boolean {
    if (!this.roomForm.dirty) {
      return true;
    }

    // Dirty show display modal dialog to user to confirm leaving
    const modalContent: IModalContent = {
      header: 'Lose Unsaved Changes?',
      body: 'You have unsaved changes! Would you like to leave the page and lose them?',
      cancelButtonText: 'Cancel',
      OKButtonText: 'Leave'
    };
    return this.modalService.show(modalContent);
  }

}
