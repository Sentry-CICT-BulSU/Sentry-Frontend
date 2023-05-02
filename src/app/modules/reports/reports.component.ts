import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/core/services/system.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
})
export class ReportsComponent implements OnInit {

  constructor(public systemService: SystemService) { }

  ngOnInit() : void {}

}
