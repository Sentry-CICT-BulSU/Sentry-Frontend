import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faculty-profile',
  templateUrl: './faculty-profile.component.html',
})
export class FacultyProfileComponent implements OnInit {
  ngOnInit():void {
    this.initComponent();
  }


  initComponent() {
    const tabLinks = document.querySelectorAll(
        '.tab-link'
    ) as NodeListOf<HTMLAnchorElement>;
    const tabContents = document.querySelectorAll(
        '.tab-content'
    ) as NodeListOf<HTMLElement>;

    tabLinks[0].classList.add('grp-active');
    tabContents[0].classList.add('active');

    tabLinks.forEach((link: HTMLAnchorElement) => {
        link.addEventListener('click', (event: Event) => {
            event.preventDefault();
            const selectedTab = link.hash;
            tabLinks.forEach((link) => {
                link.classList.remove('grp-active');
            });
            tabContents.forEach((content) => {
                content.classList.remove('active');
            });
            link.classList.add('grp-active');
            (
                document.querySelector(selectedTab) as HTMLElement
            ).classList.add('active');
        });
    });
  }
}
