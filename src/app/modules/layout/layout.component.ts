import { IUser } from './../../core/models/user.model';
import { Router } from '@angular/router';
import { LocalStorageService } from './../../core/services/local-storage.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpEvent } from '@angular/common/http';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
    constructor(
        private authService: AuthService,
        private localStorage: LocalStorageService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.authService.loadUser$()
            .subscribe(() => {
                console.log('user: ', this.authService.current_user);
                console.log('types: ', this.authService.user_types);
                console.log('current user type: ', this.authService.current_user_type);
                // [Admin, Faculty, Attendance Checker]
            });
    }

    signOut(event: boolean) {
        if (event) {
            this.authService.logout();
        }
    }
}
