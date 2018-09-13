import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { RoomEditComponent } from './room-edit.component';
import { LoggerService } from '../core/services/logger.service';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<RoomEditComponent> {

  constructor(private logger: LoggerService) {}

  canDeactivate(
    component: RoomEditComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    this.logger.log(`roomId: ${route.parent.params['id']} URL: ${state.url}`);

    return component.canDeactivate();
  }
}
