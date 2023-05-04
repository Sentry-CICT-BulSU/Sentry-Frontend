import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, concatMap, forkJoin, of } from 'rxjs';
import { ISection } from 'src/app/core/models';
import { AdminService } from 'src/app/core/services/admin.service';
import { SectionService } from 'src/app/core/services/section.service';
import { SystemService } from 'src/app/core/services/system.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-section',
  templateUrl: './edit-section.component.html',
})
export class EditSectionComponent implements OnInit {
  section?: ISection;
  editSectionForm?: FormGroup;
  faculty = new BehaviorSubject<any>(null);
  semesters = new BehaviorSubject<any>(null);
  constructor(
    public systemService: SystemService,
    private sectionService: SectionService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.loadSection();
  }

  loadSection() {
    this.route.params
      .pipe(
        concatMap((params) =>
          params['id']
            ? forkJoin([
                this.sectionService.loadSection$(+params['id']),
                this.adminService.getLists$('faculty'),
                this.adminService.getLists$('semester'),
              ])
            : forkJoin([of(null), of(null), of(null)])
        )
      )
      .subscribe({
        next: ([section, faculty, semesters]) => {
          if (section && faculty && semesters) {
            console.log(section, faculty, semesters);
            this.section = section.data as ISection;
            this.faculty.next(faculty);
            this.semesters.next(semesters);
            this.initComponent(this.section);
          }
        },
        error: (err) => console.debug(err),
      });
  }

  initComponent(section: ISection) {
    this.editSectionForm = this.fb.group({
      semester_id: [section.semester_id],
      adviser_id: [section.adviser_id],
      name: [section.name],
      status: [section.status],
    });
  }

  onSubmit() {
    if (!this.editSectionForm) return;
    if (!this.section) return;
    this.sectionService
      .updateSection$(this.section.id, this.editSectionForm.value)
      .subscribe({
        next: (section) => {
          console.log(section);
          this.router.navigate(['/section']);

          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Section edited successfully!',
          });

        },
        error: (err) => console.debug(err),
      });
  }
}
