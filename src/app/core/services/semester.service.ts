import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { ISemester } from '../models/semester.model';
import { IUser } from '../models';
import { environment } from 'src/environments/environment';
import { PropertiesService } from './properties.service';

@Injectable({
    providedIn: 'root',
})
export class SemesterService extends PropertiesService {
    user?: IUser;
    constructor(private authService: AuthService, private http: HttpClient) {
        super();
        this.authService.current_user_subject$?.subscribe(
            (user: IUser | undefined) => (this.user = user)
        );
    }

    get loadSemesters() {
        let url;
        if (this.user?.type === 'Admin') {
            url = environment.apiRootRoute + '/api/admin/semesters';
        } else if (
            this.user?.type === 'Attendance Checker' ||
            this.user?.type === 'Faculty'
        ) {
            url = environment.apiRootRoute + '/api/semesters';
        } else {
            throw new Error('User is not an admin');
        }
        return this.http.get<ISemester>(url, { headers: this.options.headers });
    }

    loadSemester(id: ISemester['id']) {
        let url;
        if (this.user?.type === 'Admin') {
            url = environment.apiRootRoute + '/api/admin/semesters/' + id;
        } else if (
            this.user?.type === 'Attendance Checker' ||
            this.user?.type === 'Faculty'
        ) {
            url = environment.apiRootRoute + '/api/semesters/' + id;
        } else {
            throw new Error('User is anonymous');
        }
        return this.http.get<ISemester>(url, { headers: this.options.headers });
    }
}
