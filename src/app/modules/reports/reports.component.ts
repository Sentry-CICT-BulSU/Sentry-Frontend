import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportsService } from 'src/app/core/services/reports.service';
import { SystemService } from 'src/app/core/services/system.service';

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
    }
    console.log(body);
    this.reportsService.getReport$(body).subscribe({
      next: (report) => {
        console.log(report);
        this.report = report;
      },
      error: (err) => console.debug(err),
    });
  }
}
