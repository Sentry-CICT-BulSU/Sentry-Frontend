import { AuthService } from 'src/app/core/services/auth.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
    constructor(private authService: AuthService) {}

    signOut(event: boolean) {
        if (event) {
            this.authService.logout();
        }
    }
}
