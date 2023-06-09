import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ISemester, ISemesterCollection } from 'src/app/core/models';
import { SemesterService } from 'src/app/core/services/semester.service';
import Swal from 'sweetalert2';
import { SystemService } from 'src/app/core/services/system.service';

@Component({
  selector: 'app-semester-list',
  templateUrl: './semester-list.component.html',
})
export class SemesterListComponent implements OnInit {
  semesterCollection?: ISemesterCollection;
  semesters?: ISemester[];
  activeSemesterCollection?: ISemesterCollection;
  activeSemesters?: ISemester[];
  inactiveSemesterCollection?: ISemesterCollection;
  inactiveSemesters?: ISemester[];
  constructor(
    private semesterService: SemesterService,
    private router: Router,
    public systemService: SystemService
  ) {}

  p = 1;

  getStatusClass(status: string): string {
    return status === 'Active'
      ? 'bg-green-500/25 text-green-500'
      : 'bg-gray-300/25 text-gray-500 dark:text-gray-300';
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Confirm Delete',
      text: 'Are you sure you want to delete this semester?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6941C6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.semesterService.softDeleteSemester$(id).subscribe({
          next: (resp) => {
            console.log(resp);
            Swal.fire({
              title: 'Deleted!',
              text: 'Semester has been deleted.',
              icon: 'success',
              showConfirmButton: true,
            }).then((result) => {
              this.loadAll();
              this.loadActive();
              this.loadInactive();
            });
          },
          error: (err) => console.debug(err),
        });
      }
    });
  }

  initSystemColor() {
    const color = this.systemService.color;

    this.replaceClassName('bg-primary-', `bg-${color}-`);
    this.replaceClassName('text-primary-', `text-${color}-`);
    this.replaceClassName('border-primary-', `border-${color}-`);
    this.replaceClassName('ring-primary-', `ring-${color}-`);
    this.replaceClassName('hover:bg-primary-', `hover:bg-${color}-`);
    this.replaceClassName(
      'scrollbar-track-primary-',
      `scrollbar-track-${color}-`
    );
    this.replaceClassName(
      'scrollbar-thumb-primary-',
      `scrollbar-thumb-${color}-`
    );
    // this.replaceClassName('tab-link', `tab-link-${color}`);
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
    this.initSystemColor();
    this.loadAll();
    this.loadActive();
    this.loadInactive();
    this.initComponent();
  }

  loadActive() {
    const query = {
      q: 'active',
    };
    this.semesterService.loadSemesters$(query).subscribe((semester) => {
      this.activeSemesterCollection = semester as ISemesterCollection;
      this.activeSemesters = this.activeSemesterCollection.data as ISemester[];
      console.log('active', semester);
    });
  }
  loadInactive() {
    const query = {
      q: 'inactive',
    };
    this.semesterService.loadSemesters$(query).subscribe((semester) => {
      this.inactiveSemesterCollection = semester as ISemesterCollection;
      this.inactiveSemesters = this.inactiveSemesterCollection
        .data as ISemester[];
      console.log('inactive', semester);
    });
  }
  loadAll() {
    this.semesterService.loadSemesters$().subscribe((semester) => {
      this.semesterCollection = semester as ISemesterCollection;
      this.semesters = this.semesterCollection.data as ISemester[];
      console.log('all', semester);
    });
  }

  initComponent() {
    const tabLinks = document.querySelectorAll(
      '.tab-link'
    ) as NodeListOf<HTMLAnchorElement>;
    const tabContents = document.querySelectorAll(
      '.tab-content'
    ) as NodeListOf<HTMLElement>;

    tabLinks[0].classList.add('active');
    tabContents[0].classList.add('active');

    tabLinks.forEach((link: HTMLAnchorElement) => {
      link.addEventListener('click', (event: Event) => {
        event.preventDefault();
        const selectedTab = link.hash;
        tabLinks.forEach((link) => {
          link.classList.remove('active');
        });
        tabContents.forEach((content) => {
          content.classList.remove('active');
        });
        link.classList.add('active');
        (document.querySelector(selectedTab) as HTMLElement).classList.add(
          'active'
        );
      });
    });
  }
}
