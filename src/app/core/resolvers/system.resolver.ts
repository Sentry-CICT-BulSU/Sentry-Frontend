/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import {
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Resolve,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { IUser } from '../models';
import { SystemService } from '../services/system.service';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SystemResolver implements Resolve<IUser | null> {
  constructor(private system: SystemService, private title: Title) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.system.getSystemSettings$().pipe(
      tap((settings) => {
        this.title.setTitle(this.system.name);
      })
    );
  }
}
