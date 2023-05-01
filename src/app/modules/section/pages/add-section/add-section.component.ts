import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, forkJoin, tap } from 'rxjs';
import { AdminService } from 'src/app/core/services/admin.service';
import { SectionService } from 'src/app/core/services/section.service';
import { SystemService } from 'src/app/core/services/system.service';

@Component({
  selector: 'app-add-section',
  templateUrl: './add-section.component.html',
})
export class AddSectionComponent implements OnInit {
  newSectionForm?: FormGroup;
  faculty = new BehaviorSubject<any>(null);
  semesters = new BehaviorSubject<any>(null);
  constructor(
    private fb: FormBuilder,
    private sectionService: SectionService,
    private adminService: AdminService,
    private router: Router,
    public systemService: SystemService
  ) {}

  ngOnInit(): void {
    this.initComponent();
    this.initLists();
  }

  initComponent() {
    this.newSectionForm = this.fb.group({
      semester_id: ['', Validators.required],
      name: ['', Validators.required],
      adviser_id: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  initLists() {
    forkJoin([
      this.adminService.getLists$('faculty'),
      this.adminService.getLists$('semester'),
    ])
      .pipe(
        tap(([faculty, semester]) => {
          console.log(faculty);
          console.log(semester);

          this.faculty.next(faculty);
          this.semesters.next(semester);
        })
      )
      .subscribe();
  }

  onSubmit() {
    if (!this.newSectionForm) return;
    this.newSectionForm.value;
    this.sectionService.addSection$(this.newSectionForm.value).subscribe({
      next: (section) => {
        console.log(section);
        this.router.navigate(['/section']);
      },
      error: (err) => console.debug(err),
    });
  }
}
