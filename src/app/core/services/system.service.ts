import { Injectable } from '@angular/core';
import { PropertiesService } from './properties.service';

@Injectable({
  providedIn: 'root',
})
export class SystemService extends PropertiesService {
  constructor() {
    super();
  }

  set color(color: string) {
    if (!SYSTEM_COLORS.includes(color)) return; // do nothing if selected color does not exists in SYSTEM_COLORS
    localStorage.setItem('selectedColor', color); // Save selected color in local storage
  }

  get color() {
    return localStorage.getItem('selectedColor') || 'primary'; // defaults to primary if 'selelctedColor' from localStorage is null
  }
}

const SYSTEM_COLORS: string[] = ['primary', 'orange', 'blue', 'teal', 'red'];
