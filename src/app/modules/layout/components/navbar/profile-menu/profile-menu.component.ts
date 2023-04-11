import { Component, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/core/models';

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

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnChanges(): void {
        this.user = this.activatedRoute.snapshot.data['user'];
    }

    public toggleMenu(): void {
        this.isMenuOpen = !this.isMenuOpen;
    }
}

// This component can be used in a template to display a profile menu that can be toggled on and off. The isMenuOpen property is used
// to determine whether the menu should be displayed or hidden, and the toggleMenu method can be called to change the menu state.
