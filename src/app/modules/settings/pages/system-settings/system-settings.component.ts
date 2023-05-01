import { Component, } from '@angular/core';
import { ColorService } from 'src/app/core/services/color.service';

@Component({
  selector: 'app-system-settings',
  templateUrl: './system-settings.component.html',
})
export class SystemSettingsComponent {

  constructor(private colorService: ColorService) {}

  setColor(color: string) {
    this.colorService.selectedColor = color;
    localStorage.setItem('selectedColor', color); // Save selected color in local storage
  }

}
