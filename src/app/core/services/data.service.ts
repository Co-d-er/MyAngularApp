import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { IRoom, IState, IPagedResults, IApiResponse } from '../../shared/interfaces';

@Injectable()
export class DataService {

    roomsBaseUrl = '/api/rooms';
    states: IState[];

    constructor(private http: HttpClient) { }

    getRoomsPage(page: number, pageSize: number): Observable<IPagedResults<IRoom[]>> {
        return this.http.get<IRoom[]>(
            `${this.roomsBaseUrl}/page/${page}/${pageSize}`,
            { observe: 'response' })
            .pipe(
                map(res => {
                    const totalRecords = +res.headers.get('X-InlineCount');
                    const rooms = res.body as IRoom[];
                    return {
                        results: rooms,
                        totalRecords: totalRecords
                    };
                }),
                catchError(this.handleError)
            );
    }

    getRooms(): Observable<IRoom[]> {
        return this.http.get<IRoom[]>(this.roomsBaseUrl)
            .pipe(
                map(rooms => {
                    return rooms;
                }),
                catchError(this.handleError)
            );
    }

    getRoom(id: number): Observable<IRoom> {
        return this.http.get<IRoom>(this.roomsBaseUrl + '/' + id)
            .pipe(
                map(room => {
                    return room;
                }),
                catchError(this.handleError)
            );
    }

    insertRoom(room: IRoom): Observable<IRoom> {
        return this.http.post<IRoom>(this.roomsBaseUrl, room)
            .pipe(catchError(this.handleError));
    }

    updateRoom(room: IRoom): Observable<boolean> {
        return this.http.put<IApiResponse>(this.roomsBaseUrl + '/' + room.id, room)
            .pipe(
                map(res => res.status),
                catchError(this.handleError)
            );
    }

    deleteRoom(id: number): Observable<boolean> {
        return this.http.delete<IApiResponse>(this.roomsBaseUrl + '/' + id)
            .pipe(
                map(res => res.status),
                catchError(this.handleError)
            );
    }

    getStates(): Observable<IState[]> {
        return this.http.get<IState[]>('/api/states')
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
            const errMessage = error.error.message;
            return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'Node.js server error');
    }
}
