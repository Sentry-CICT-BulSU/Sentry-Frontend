import { Component, OnInit } from '@angular/core';
import { ISemesterCollection } from 'src/app/core/models';
import { SemesterService } from 'src/app/core/services/semester.service';

@Component({
    selector: 'app-semester-list',
    templateUrl: './semester-list.component.html',
})
export class SemesterListComponent implements OnInit {
    semesterCollection?: ISemesterCollection;
    constructor(private semesterService: SemesterService) {}

    ngOnInit(): void {
        this.semesterService.loadSemesters$().subscribe((semester) => {
            this.semesterCollection = semester as ISemesterCollection;
            console.log(this.semesterCollection);
        });
        this.initComponent();
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
                (
                    document.querySelector(selectedTab) as HTMLElement
                ).classList.add('active');
            });
        });
    }
}
