import { Router } from '@angular/router';
import { LocalStorageService } from './../../core/services/local-storage.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Component, OnInit } from '@angular/core';

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

    ngOnInit(): void { }

    signOut(event: boolean) {
        if (event) {
            this.authService.logout();
        }
    }
}
