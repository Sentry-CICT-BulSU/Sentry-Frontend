import { Component, OnInit } from '@angular/core';
import { IScheduleCollection } from 'src/app/core/models/schedule.model';
import { ScheduleService } from 'src/app/core/services/schedule.service';
import { SystemService } from 'src/app/core/services/system.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
})
export class ScheduleListComponent implements OnInit {
  schedules?: IScheduleCollection;
  isMultiPage?: boolean;

  constructor(
    private scheduleService: ScheduleService,
    public systemService: SystemService
  ) {}

  ngOnInit(): void {
    this.initComponent();
    this.scheduleService.loadSchedules$().subscribe({
      next: (schedules) => {
        console.log(schedules);
        this.schedules = schedules;
      },
      error: (err) => {
        console.debug(err);
      },
    });
    this.initSystemColor();
  }

  initSystemColor() {
    const color = this.systemService.color;

    this.replaceClassName('bg-primary-', `bg-${color}-`);
    this.replaceClassName('text-primary-', `text-${color}-`);
    this.replaceClassName('border-primary-', `border-${color}-`);
    this.replaceClassName('ring-primary-', `ring-${color}-`);
    this.replaceClassName('hover:bg-primary-', `hover:bg-${color}-`);
    this.replaceClassName('button-primary', `button-${color}`);
    this.replaceClassName('tab-link', `tab-link-${color}`);
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

  initComponent() {
    const tabLinks = document.querySelectorAll(
      '.tab-link'
    ) as NodeListOf<HTMLAnchorElement>;
    const tabContents = document.querySelectorAll(
      '.tab-content'
    ) as NodeListOf<HTMLElement>;

    // Set Personal Information as default active tab
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
    console.log('hit!', id);
    Swal.fire({
      title: 'Confirm Delete',
      text: 'Are you sure you want to delete this schedule?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6941C6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('delete room');
        this.scheduleService.deleteSchedule$(id).subscribe({
          next: (resp) => {
            console.log(resp);
            window.location.reload();
          },
        });
        Swal.fire('Deleted!', 'Schedule has been deleted.', 'success');
      }
    });
  }

  pageMaxCount() {
    return new Array(this.schedules?.meta?.last_page);
  }
}
