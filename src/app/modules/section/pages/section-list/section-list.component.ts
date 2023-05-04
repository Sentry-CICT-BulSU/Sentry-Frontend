import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ISection, ISectionCollection } from 'src/app/core/models';
import { SectionService } from 'src/app/core/services/section.service';
import { SystemService } from 'src/app/core/services/system.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
})
export class SectionListComponent implements OnInit {
  sectionsCollection?: ISectionCollection;
  sections?: ISection[];
  sectionsActiveCollection?: ISectionCollection;
  sectionsActive?: ISection[];
  sectionsInactiveCollection?: ISectionCollection;
  sectionsInactive?: ISection[];
  constructor(
    private sectionService: SectionService,
    private router: Router,
    public systemService: SystemService
  ) {}

  public searchTerm = '';

  p = 1;

  selectedSort = 'latest';

  currentSortType!: string;

  get filteredSearchSections() {
    if (!this.sections) {
      return [];
    }
    return this.sections.filter((section) => {
      return (
        section.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        section.adviser?.full_name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
  }

  get filteredSearchActiveSections() {
    if (!this.sectionsActive) {
      return [];
    }
    return this.sectionsActive.filter((section) => {
      return (
        section.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        section.adviser?.full_name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
  }

  get filteredSearchInactiveSections() {
    if (!this.sectionsInactive) {
      return [];
    }
    return this.sectionsInactive.filter((section) => {
      return (
        section.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        section.adviser?.full_name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
  }






  sortSections(sections: any[], sortParam: string): any[] {
    return sections.sort((a, b) => {
      if (sortParam === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortParam === 'latest') {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      } else if (sortParam === 'oldest') {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      } else {
        return 0;
      }
    });
  }

  sortActiveSections(sectionsActive: any[], sortParam: string): any[] {
    return sectionsActive.sort((a, b) => {
      if (sortParam === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortParam === 'latest') {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      } else if (sortParam === 'oldest') {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      } else {
        return 0;
      }
    });
  }


  sortInactiveSections(sectionsInactive: any[], sortParam: string): any[] {
    return sectionsInactive.sort((a, b) => {
      if (sortParam === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortParam === 'latest') {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      } else if (sortParam === 'oldest') {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      } else {
        return 0;
      }
    });
  }


  ngOnInit(): void {
    this.initComponent();
    this.loadSections();
  }

  getStatusClass(status: string): string {
    if (status === 'Active') {
      return 'bg-green-500/25 text-green-500';
    } else {
      return 'bg-gray-300/25 text-gray-500 dark:text-gray-300';
    }
  }

  loadSections() {
    forkJoin([
      this.sectionService.loadSections$(),
      this.sectionService.loadSections$('active'),
      this.sectionService.loadSections$('inactive'),
    ]).subscribe({
      next: ([sections, active, inactive]) => {
        console.log(sections, active, inactive);
        this.sectionsCollection = sections;
        this.sections = sections.data as ISection[];
        this.sectionsActiveCollection = active;
        this.sectionsActive = active.data as ISection[];
        this.sectionsInactiveCollection = inactive;
        this.sectionsInactive = inactive.data as ISection[];
      },
      error: (err) => console.debug(err),
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

  onDelete(id: number) {
    Swal.fire({
      title: 'Confirm Delete',
      text: 'Are you sure you want to delete this section?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6941C6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('delete room');
        this.sectionService.deleteSection$(id).subscribe({
          next: (resp) => {
            console.log(resp);
            this.ngOnInit();
          },
          error: (err) => console.debug(err),
        });
        Swal.fire('Deleted!', 'Section has been deleted.', 'success');
      }
    });
  }
}
