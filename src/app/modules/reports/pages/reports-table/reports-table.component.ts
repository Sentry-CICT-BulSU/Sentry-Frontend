import { Component, Input } from '@angular/core';

@Component({
  selector: 'reports-table',
  templateUrl: './reports-table.component.html',
  styleUrls: ['./reports-table.component.scss'],
})
export class ReportsTableComponent {
  @Input() report?: any;
  @Input() type?: string;
}
