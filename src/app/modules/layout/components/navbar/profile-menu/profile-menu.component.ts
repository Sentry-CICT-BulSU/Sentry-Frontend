import { Component, OnChanges, OnInit } from '@angular/core';
import { IUser } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-profile-menu',
    templateUrl: './profile-menu.component.html',
    styleUrls: ['./profile-menu.component.scss'],
})

// The component has a boolean property isMenuOpen that is initially set to false. It also has a method called toggleMenu(),
// which toggles the value of isMenuOpen between true and false.
export class ProfileMenuComponent implements OnChanges {
    public isMenuOpen = false;
    user?: IUser;

    constructor(private authService: AuthService) {}

    ngOnChanges(): void {
        this.authService.current_user_subject$?.subscribe(
            (user) => (this.user = user)
        );
    }

    public toggleMenu(): void {
        this.isMenuOpen = !this.isMenuOpen;
    }
}

// This component can be used in a template to display a profile menu that can be toggled on and off. The isMenuOpen property is used
// to determine whether the menu should be displayed or hidden, and the toggleMenu method can be called to change the menu state.
