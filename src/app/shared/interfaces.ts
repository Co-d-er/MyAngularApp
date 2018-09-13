import { ModuleWithProviders } from '@angular/core';
import { Routes } from '@angular/router';

export interface IRoom {
    id: number;
    name: string;
    avatar: string;
    address: string;
    city: string;
    state: IState;
    price: number;
    area: number;
    bed_type: string;
}

export interface IState {
    abbreviation: string;
    name: string;
}

export interface IOrder {
    productName: string;
    itemCost: number;
}

export interface IOrderItem {
    id: number;
    productName: string;
    itemCost: number;
}

export interface IPagedResults<T> {
    totalRecords: number;
    results: T;
}

export interface IUserLogin {
    email: string;
    password: string;
}

export interface IApiResponse {
    status: boolean;
    error?: string;
}
