import { Injectable } from '@angular/core';
import { PropertiesService } from './properties.service';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { tap } from 'rxjs';

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

  get name() {
    return localStorage.getItem('sys_name') || 'CICT Sentry';
  }
  get about() {
    return (
      localStorage.getItem('sys_about') ||
      'Welcome to the Web-based CICT Class Monitoring and Key Inventory System Introducing a cutting-edge attendance and key inventory management system for the College of Information and Communications Technology (CICT) ! With user-friendly registration and login, easy faculty and schedule management, mobile-friendly attendance tracking, and visual key inventory tracking, our system streamlines administrative tasks. Generate comprehensive reports, manage website content, and stay organized with our intuitive dashboard. Upgrade your CICT operations with our powerful system today!'
    );
  }
  get icon() {
    return localStorage.getItem('sys_icon') || 'assets/icons/CICT Logo.png';
  }

  getSystemSettings$() {
    return this.http
      .get<any>(this.url, {
        headers: this.options.headers,
      })
      .pipe(
        tap((settings) => {
          console.log('system settings: ', settings);
          localStorage.setItem('sys_name', JSON.stringify(settings.data.name));
          localStorage.setItem(
            'sys_about',
            JSON.stringify(settings.data.about)
          );
          localStorage.setItem('sys_icon', JSON.stringify(settings.data.icon));
          localStorage.setItem(
            'sys_color',
            JSON.stringify(settings.data.color)
          );
        })
      );
  }

  updateSystem$(body: any) {
    return this.http.post(this.url, body);
  }
}

const SYSTEM_COLORS: string[] = ['primary', 'orange', 'blue', 'teal', 'red'];
