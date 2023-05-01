import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/core/services/system.service';

@Component({
  selector: 'app-edit-section',
  templateUrl: './edit-section.component.html',
})
export class EditSectionComponent implements OnInit {

  constructor(
    public systemService: SystemService
) {}

  ngOnInit(): void {

  }


}
