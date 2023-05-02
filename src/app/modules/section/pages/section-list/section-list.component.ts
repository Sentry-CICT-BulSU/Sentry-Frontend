import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ISection, ISectionCollection } from 'src/app/core/models';
import { SectionService } from 'src/app/core/services/section.service';
import { SystemService } from 'src/app/core/services/system.service';

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
  constructor(private sectionService: SectionService, private router: Router, public systemService: SystemService) {}

  ngOnInit(): void {
    this.initComponent();
    this.loadSections();
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
    this.sectionService.deleteSection$(id).subscribe({
      next: (resp) => {
        console.log(resp);
        this.router.navigate(['/section']);
      },
      error: (err) => console.debug(err),
    });
  }
}
