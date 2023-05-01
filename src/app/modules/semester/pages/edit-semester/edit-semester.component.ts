import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ISemester } from 'src/app/core/models';
import { SemesterService } from 'src/app/core/services/semester.service';
import Swal from 'sweetalert2';
import { SystemService } from 'src/app/core/services/system.service';

@Component({
  selector: 'app-edit-semester',
  templateUrl: './edit-semester.component.html',
})
export class EditSemesterComponent implements OnInit {
  editSemesterForm?: FormGroup;
  semesterId?: number;
  constructor(
    private fb: FormBuilder,
    private semesterService: SemesterService,
    private route: ActivatedRoute,
    private router: Router,
    public systemService: SystemService
  ) {}

  onSubmit() {
    //add code here
    if (!this.editSemesterForm) return;
    if (!this.editSemesterForm.value) return;
    if (!this.semesterId) return;

    console.log(this.editSemesterForm.value);
    this.semesterService
      .editSemester$(this.semesterId, this.editSemesterForm.value)
      .subscribe({
        next: (semester) => {
          console.log(semester);
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Semester edited successfully!',
            showConfirmButton: true,
          }).then((result) => {
            console.log(result);
            this.router.navigate(['/semester']);
          });
        },
        error: (err) => console.debug(err),
      });
  }

  ngOnInit() {
    this.initForm();
    this.route.params.subscribe((params) => {
      if (params['id'] && !isNaN(+params['id'])) {
        this.semesterId = +params['id'];
        this.semesterService.loadSemester$(+params['id']).subscribe({
          next: (semester) => {
            this.preloadValues(semester.data as ISemester);
            console.log(semester);
          },
          error: (err) => {
            console.debug(err);
            this.router.navigate(['/semester']);
          },
        });
      }
    });
  }

  initForm() {
    this.editSemesterForm = this.fb.group({
      name: [''],
      academic_year: [''],
      status: [''],
      duration_start: [''],
      duration_end: [''],
    });
  }
  preloadValues(semester: ISemester) {
    this.editSemesterForm?.patchValue({
      name: semester.name,
      academic_year: semester.academic_year,
      status: semester.status,
      duration_start: semester.duration_start,
      duration_end: semester.duration_end,
    });
  }
}
