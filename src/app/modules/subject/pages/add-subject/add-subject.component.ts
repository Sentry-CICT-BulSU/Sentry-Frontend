import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubjectService } from 'src/app/core/services/subject.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-add-subject',
    templateUrl: './add-subject.component.html',
})
export class AddSubjectComponent implements OnInit {
    newSubjectForm?: FormGroup;
    constructor(
        private subjectService: SubjectService,
        private fb: FormBuilder,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.newSubjectForm = this.fb.group({
            title: ['', [Validators.required]],
            code: ['', [Validators.required]],
            status: ['', [Validators.required]],
        });
    }

    onSubmit() {
        this.subjectService.addSuject$(this.newSubjectForm?.value).subscribe({
            next: (subject) => {
                console.log(subject);
                this.router.navigate(['/subject']);

                Swal.fire({
                  icon: 'success',
                  title: 'Success',
                  text: 'Subject added successfully!',
                });
            },
            error: (err) => console.debug(err),
        });
    }
}
