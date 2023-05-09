import { AuthService } from 'src/app/core/services/auth.service';
import { Component } from '@angular/core';
import { SystemService } from 'src/app/core/services/system.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  constructor(
    private authService: AuthService,
    public systemService: SystemService
  ) {}

  ngOnInit(): void {
    this.initSystemColor();
  }

  signOut(event: boolean) {
    if (event) {
      console.log(event);
      this.authService.logout();
    }
  }

  initSystemColor() {
    const color = this.systemService.color;

    this.replaceClassName('md:bg-primary-', `md:bg-${color}-`);
    this.replaceClassName('text-primary-', `text-${color}-`);
    this.replaceClassName('border-primary-', `border-${color}-`);
    this.replaceClassName('ring-primary-', `ring-${color}-`);
    this.replaceClassName('hover:bg-primary-', `hover:bg-${color}-`);
    this.replaceClassName('button-colored', `button-${color}`);
    this.replaceClassName('tab-link', `tab-link-${color}`);
    this.replaceClassName(
      'peer-checked:bg-primary-',
      `peer-checked:bg-${color}-`
    );
    this.replaceClassName(
      'peer-checked:border-primary-',
      `peer-checked:border-${color}-`
    );
  }

  private replaceClassName(prefix: string, replacement: string) {
    const elements = document.querySelectorAll(`[class*="${prefix}"]`);
    for (let i = 0; i < elements.length; i++) {
      const classList = elements[i].classList;
      for (let j = 0; j < classList.length; j++) {
        if (classList[j].startsWith(prefix)) {
          classList.replace(
            classList[j],
            classList[j].replace(prefix, replacement)
          );
        }
      }
    }
  }
}
