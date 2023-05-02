import { Component } from '@angular/core';
// import { ColorService } from 'src/app/core/services/color.service';
import { SystemService } from 'src/app/core/services/system.service';

@Component({
  selector: 'app-system-settings',
  templateUrl: './system-settings.component.html',
})
export class SystemSettingsComponent {
  constructor(
    // private colorService: ColorService,
    private systemService: SystemService
  ) {}

  ngOnInit(): void {

    this.initSystemColor();
  }

  initSystemColor() {
    const color = this.systemService.color;
    console.log('system color: ', color);
    this.replaceClassName('bg-primary-', `bg-${this.systemService.color}-`);
    this.replaceClassName('text-primary-', `text-${this.systemService.color}-`);
    this.replaceClassName('border-primary-', `border-${this.systemService.color}-`);
    this.replaceClassName('ring-primary-', `ring-${this.systemService.color}-`);
    this.replaceClassName('hover:bg-primary-', `hover:bg-${this.systemService.color}-`);
    // this.replaceClassName('button-colored', `button-${this.systemService.color}`);
    this.replaceClassName('tab-link', `tab-link-${this.systemService.color}`);
    this.replaceClassName('peer-checked:bg-primary-', `peer-checked:bg-${this.systemService.color}-`);
    this.replaceClassName('peer-checked:border-primary-', `peer-checked:border-${this.systemService.color}-`);
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

  setColor(color: string) {
    this.systemService.color = color;
    // this.colorService.selectedColor = color;
    // localStorage.setItem('selectedColor', color); // Save selected color in local storage
  }
}
