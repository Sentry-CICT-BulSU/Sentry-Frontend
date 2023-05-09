/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import {
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Resolve,
} from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from '../models';
import { SystemService } from '../services/system.service';

@Injectable({
  providedIn: 'root',
})
export class SystemResolver implements Resolve<IUser | null> {
  constructor(private system: SystemService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.system.getSystemSettings$();
  }
}
