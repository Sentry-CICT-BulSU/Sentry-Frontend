import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportsService } from 'src/app/core/services/reports.service';
import { SystemService } from 'src/app/core/services/system.service';
import * as printJS from 'print-js';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
})
export class ReportsComponent implements OnInit {
  generateReportForm?: FormGroup;
  report?: any;
  blob?: Blob;
  constructor(
    public systemService: SystemService,
    private reportsService: ReportsService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.generateReportForm = this.fb.group({
      type: ['', [Validators.required]],
      time: ['', [Validators.required]],
    });
  }

  onSubmit(type: string) {
    if (!this.generateReportForm) return;
    if (
      !this.generateReportForm.value.type &&
      !this.generateReportForm.value.time
    )
      return;
    const body = {
      type: this.generateReportForm.value.type,
      time: this.generateReportForm.value.time,
    };
    if (type === 'preview') {
      Object.assign(body, { preview: true });
    } else if (type === 'pdf') {
      Object.assign(body, { pdf: true });
    } else {
      Object.assign(body, { csv: true });
    }
    console.log(body);
    this.reportsService.getReport$(body).subscribe({
      next: (report) => {
        if (report) {
          if (type === 'pdf') {
            const downloadURL = window.URL.createObjectURL(
              new Blob([report as Blob], { type: 'application/pdf' })
            );
            printJS(downloadURL);
          } else if (type === 'preview') {
            this.report = report;
          } else {
            const downloadURL = window.URL.createObjectURL(
              new Blob([report as Blob], { type: 'text/csv' })
            );
            window.open(downloadURL, '_blank');
          }
        }
      },
      error: (err) => console.debug(err),
    });
  }
}
