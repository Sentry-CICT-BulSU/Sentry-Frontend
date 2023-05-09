import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SemesterService } from 'src/app/core/services/semester.service';
import Swal from 'sweetalert2';
import { SystemService } from 'src/app/core/services/system.service';

@Component({
  selector: 'app-add-semester',
  templateUrl: './add-semester.component.html',
})
export class AddSemesterComponent implements OnInit {
  newSemesterForm?: FormGroup;
  constructor(
    private semesterService: SemesterService,
    private fb: FormBuilder,
    private router: Router,
    public systemService: SystemService
  ) {}

  initSystemColor() {
    const color = this.systemService.color;

    this.replaceClassName('bg-primary-', `bg-${color}-`);
    this.replaceClassName('text-primary-', `text-${color}-`);
    this.replaceClassName('border-primary-', `border-${color}-`);
    this.replaceClassName('ring-primary-', `ring-${color}-`);
    this.replaceClassName('hover:bg-primary-', `hover:bg-${color}-`);
    this.replaceClassName(
      'peer-checked:bg-primary-',
      `peer-checked:bg-${color}-`
    );
    this.replaceClassName(
      'peer-checked:border-primary-',
      `peer-checked:border-${color}-`
    );
  }

  private replaceClassName(prefix: string, replacement: string) {
    const elements = document.querySelectorAll(`[class*="${prefix}"]`);
    for (let i = 0; i < elements.length; i++) {
      const classList = elements[i].classList;
      for (let j = 0; j < classList.length; j++) {
        if (classList[j].startsWith(prefix)) {
          classList.replace(
            classList[j],
            classList[j].replace(prefix, replacement)
          );
        }
      }
    }
  }

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
    this.semesterService.addSemester$(this.newSemesterForm?.value).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/semester']);

        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Semester added successfully!',
        });
      },
      error: (err) => console.debug(err),
    });
  }
}
