import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SemesterService } from 'src/app/core/services/semester.service';

@Component({
    selector: 'app-add-semester',
    templateUrl: './add-semester.component.html',
})
export class AddSemesterComponent implements OnInit {
    newSemesterForm?: FormGroup;
    constructor(
        private semesterService: SemesterService,
        private fb: FormBuilder,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.initComponent();
    }

    initComponent() {
        this.newSemesterForm = this.fb.group({
            name: ['', Validators.required],
            academic_year: ['', Validators.required],
            status: ['', Validators.required],
            duration_start: ['', Validators.required],
            duration_end: ['', Validators.required],
        });
    }

    onSubmit() {
        console.debug(this.newSemesterForm?.value);
        this.semesterService
            .addSemester$(this.newSemesterForm?.value)
            .subscribe({
                next: (res) => {
                    console.log(res);
                    this.router.navigate(['/semester']);
                },
                error: (err) => console.debug(err),
            });
    }
}
