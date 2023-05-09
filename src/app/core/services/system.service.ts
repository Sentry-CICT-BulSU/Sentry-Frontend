import { Injectable } from '@angular/core';
import { PropertiesService } from './properties.service';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SystemService extends PropertiesService {
  constructor(private http: HttpClient) {
    super();
  }

  set color(color: string) {
    if (!SYSTEM_COLORS.includes(color)) return; // do nothing if selected color does not exists in SYSTEM_COLORS
    localStorage.setItem('selectedColor', color); // Save selected color in local storage
  }

  get color() {
    return localStorage.getItem('selectedColor') || 'primary'; // defaults to primary if 'selelctedColor' from localStorage is null
  }

  get url() {
    return env.apiRootRoute + '/api/system-settings';
  }

  getSystemSettings$() {
    return this.http.get(this.url, {
      headers: this.options.headers,
    });
  }

  updateSystem$(body: any) {
    return this.http.post(this.url, body);
  }
}

const SYSTEM_COLORS: string[] = ['primary', 'orange', 'blue', 'teal', 'red'];
