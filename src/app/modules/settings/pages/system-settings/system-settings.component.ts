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

  setColor(color: string) {
    this.systemService.color = color;
    // this.colorService.selectedColor = color;
    // localStorage.setItem('selectedColor', color); // Save selected color in local storage
  }
}
