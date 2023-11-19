import { Injectable } from '@angular/core';
import { Login } from './login.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  public setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem(key: string): string {
    const value = localStorage.getItem(key);

    if(!value) {
      return '';
    }

    return JSON.parse(value);
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public getSessionItem(key: string): string {
    const value = localStorage.getItem(key);

    if(!value) {
      return '';
    }

    return JSON.parse(value);
  }
}
