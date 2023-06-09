import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ISubject, ISubjectCollection } from 'src/app/core/models';
import { SubjectService } from 'src/app/core/services/subject.service';
import Swal from 'sweetalert2';
import { SystemService } from 'src/app/core/services/system.service';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
})
export class SubjectListComponent implements OnInit {

  p = 1;

  public searchTerm = '';

  selectedSort = 'latest';

  subjectCollection?: ISubjectCollection;
  activeSubjectCollection?: ISubjectCollection;
  inactiveSubjectCollection?: ISubjectCollection;

  subjects?: ISubject[];
  activeSubjects?: ISubject[];
  inactiveSubjects?: ISubject[];
  constructor(private subjectService: SubjectService, private router: Router, public systemService: SystemService) {}

  get filteredSearchSubjects() {
    if (!this.subjects) {
      return [];
    }
    return this.subjects.filter(subject => {
      return subject.code.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
             subject.title.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

  get filteredSearchActiveSubjects() {
    if (!this.activeSubjects) {
      return [];
    }
    return this.activeSubjects.filter(subject => {
      return subject.code.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
             subject.title.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

  get filteredSearchInactiveSubjects() {
    if (!this.inactiveSubjects) {
      return [];
    }
    return this.inactiveSubjects.filter(subject => {
      return subject.code.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
             subject.title.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }


  sortSubjects(subjects: any[], sortParam: string): any[] {
    return subjects.sort((a, b) => {
      if (sortParam === 'code') {
        return a.code.localeCompare(b.code);
      } else if (sortParam === 'latest') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (sortParam === 'oldest') {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      } else {
        return 0;
      }
    });
  }

  sortActiveSubjects(activeSubjects: any[], sortParam: string): any[] {
    return activeSubjects.sort((a, b) => {
      if (sortParam === 'code') {
        return a.code.localeCompare(b.code);
      } else if (sortParam === 'latest') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (sortParam === 'oldest') {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      } else {
        return 0;
      }
    });
  }

  sortInactiveSubjects(inactiveSubjects: any[], sortParam: string): any[] {
    return inactiveSubjects.sort((a, b) => {
      if (sortParam === 'code') {
        return a.code.localeCompare(b.code);
      } else if (sortParam === 'latest') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (sortParam === 'oldest') {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      } else {
        return 0;
      }
    });
  }

  ngOnInit(): void {
    this.initComponent();
    this.loadSubjects();
    this.loadActiveSubjects();
    this.loadInactiveSubjects();
  }

  getStatusClass(status: string): string {
    return status === 'active' ? 'bg-green-500/25 text-green-500' : 'bg-gray-300/25 text-gray-500 dark:text-gray-300';
  }

  onEdit(id: number) {
    console.log('edit subject');
  }
  // onDelete(id: number) {
  //   this.subjectService.deleteSubject$(id).subscribe({
  //     next: (resp) => {
  //       console.log(resp);
  //       this.router.navigate(['/subject']);
  //     },
  //   });
  // }

  onDelete(id: number) {
    Swal.fire({
      title: 'Confirm Delete',
      text: 'Are you sure you want to delete this subject?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6941C6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {

        this.subjectService.deleteSubject$(id).subscribe({
          next: (resp) => {
            console.log(resp);
            this.router.navigate(['/subject']);
          },
        });
        Swal.fire('Deleted!', 'Subject has been deleted.', 'success');
      }
    });
  }


  loadSubjects() {
    this.subjectService.loadSubjects$().subscribe((subject) => {
      this.subjectCollection = subject;
      this.subjects = subject.data as ISubject[];
      console.log(subject);
    });
  }
  loadActiveSubjects() {
    const query = { q: 'active' };
    this.subjectService.loadSubjects$(query).subscribe((subject) => {
      this.subjectCollection = subject;
      this.activeSubjects = subject.data as ISubject[];
      console.log(subject);
    });
  }
  loadInactiveSubjects() {
    const query = { q: 'inactive' };
    this.subjectService.loadSubjects$(query).subscribe((subject) => {
      this.subjectCollection = subject;
      this.inactiveSubjects = subject.data as ISubject[];
      console.log(subject);
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
