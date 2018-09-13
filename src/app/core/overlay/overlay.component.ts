import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { EventBusService, Events } from '../services/event-bus.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-overlay',
    templateUrl: './overlay.component.html',
    styleUrls: ['./overlay.component.css']
})
export class OverlayComponent implements OnInit, OnDestroy {

    httpRequestSub: Subscription;
    httpResponseSub: Subscription;
    enabled = false;
    queue = [];
    timerId: number = null;
    timerHideId: number = null;

    @Input() delay = 500;

    constructor(private eventBus: EventBusService) { }

    ngOnInit() {
        this.httpRequestSub = this.eventBus.on(Events.httpRequest, (() => {
            this.queue.push({});
            if (this.queue.length === 1) {
                setTimeout(() => {
                    if (this.queue.length) { this.enabled = true; }
                }, this.delay);
            }
        }));

        this.httpResponseSub = this.eventBus.on(Events.httpResponse, (() => {
            this.queue.pop();
            if (this.queue.length === 0) {
                setTimeout(() => {
                    if (this.queue.length === 0) { this.enabled = false; }
                }, this.delay);
            }
        }));
    }

    ngOnDestroy() {
        this.httpRequestSub.unsubscribe();
        this.httpResponseSub.unsubscribe();
    }

}
