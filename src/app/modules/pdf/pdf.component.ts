// Importing necessary modules from @angular
import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/core/services/system.service';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss'],
})
export class PdfComponent implements OnInit {
  sysIcon?: string;
  constructor(private system: SystemService) {}

  ngOnInit(): void {
    this.sysIcon = this.system.icon;
  }
}
