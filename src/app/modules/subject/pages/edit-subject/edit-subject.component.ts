import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ISubject } from 'src/app/core/models';
import { SubjectService } from 'src/app/core/services/subject.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
})
export class EditSubjectComponent implements OnInit {
  editSubjectForm?: FormGroup;
  subjectId?: number;
  constructor(
    private subjectService: SubjectService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.editSubjectForm) return;
    if (!this.subjectId) return;
    if (this.editSubjectForm.controls['code'].pristine) {
      this.editSubjectForm.removeControl('code');
    }
    if (this.editSubjectForm.controls['title'].pristine) {
      this.editSubjectForm.removeControl('title');
    }
    if (this.editSubjectForm.controls['status'].pristine) {
      this.editSubjectForm.removeControl('status');
    }
    console.log(this.editSubjectForm.value);
    //add code here
    this.subjectService
      .updateSubject$(this.subjectId, this.editSubjectForm.value)
      .subscribe({
        next: (subject) => {
          console.log(subject);
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Subject edited successfully!',
            showConfirmButton: true,
          }).then(() => {
            this.router.navigate(['/subject']);
          });
        },
        error: (err) => {
          console.debug(err);
        },
      });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id'] && !isNaN(+params['id'])) {
        this.subjectId = +params['id'];
        this.subjectService.loadSubject$(+params['id']).subscribe({
          next: (subject) => {
            this.initForm(subject.data as ISubject);
          },
          error: (err) => console.debug(err),
        });
      }
    });
  }
  initForm(subject: ISubject) {
    this.editSubjectForm = this.fb.group({
      code: [subject.code],
      title: [subject.title],
      status: [subject.status],
    });
  }
}
