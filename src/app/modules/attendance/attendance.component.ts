import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/core/services/system.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
})
export class AttendanceComponent implements OnInit {

    constructor(public systemService: SystemService) { }

    initSystemColor() {
      const color = this.systemService.color;
      console.log('system color: ', color);
      this.replaceClassName('md:bg-primary-', `md:bg-${this.systemService.color}-`);
      this.replaceClassName('text-primary-', `text-${this.systemService.color}-`);
      this.replaceClassName('border-primary-', `border-${this.systemService.color}-`);
      this.replaceClassName('ring-primary-', `ring-${this.systemService.color}-`);
      this.replaceClassName('hover:bg-primary-', `hover:bg-${this.systemService.color}-`);
      this.replaceClassName('peer-checked:bg-primary-', `peer-checked:bg-${this.systemService.color}-`);
      this.replaceClassName('peer-checked:border-primary-', `peer-checked:border-${this.systemService.color}-`);
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
      const tabLinks = document.querySelectorAll('.tab-link') as NodeListOf<HTMLAnchorElement>;
      const tabContents = document.querySelectorAll('.tab-content') as NodeListOf<HTMLElement>;

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
          (document.querySelector(selectedTab) as HTMLElement).classList.add('active');
        });
      });
    }

}
