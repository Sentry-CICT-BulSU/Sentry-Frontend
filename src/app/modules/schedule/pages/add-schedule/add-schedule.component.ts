// Importing necessary modules from @angular
import { Component } from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';

// Defining a new component with the selector 'app-dashboard' and the template URL 'dashboard.component.html'
@Component({
    selector: 'app-add-schedule',
    templateUrl: './add-schedule.component.html',
})

// Exporting the DashboardComponent class and implementing the OnInit interface
export class AddScheduleComponent {
    newScheduleForm;
    days = [
        { key: 'Sun', day: 'Sunday' },
        { key: 'Mon', day: 'Monday' },
        { key: 'Tue', day: 'Tuesday' },
        { key: 'Wed', day: 'Wednesday' },
        { key: 'Thu', day: 'Thursday' },
        { key: 'Fri', day: 'Friday' },
        { key: 'Sat', day: 'Saturday' },
    ];
    defaultDays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    constructor(private fb: FormBuilder) {
        this.newScheduleForm = this.fb.group({
            faculty: ['', [Validators.required]],
            room: ['', [Validators.required]],
            subject: ['', [Validators.required]],
            section: ['', [Validators.required]],
            semester: ['', [Validators.required]],
            schedule: ['', [Validators.required]],
            time_start: ['', [Validators.required]],
            time_end: ['', [Validators.required]],
            active_days: this.fb.group({
                Sunday: [false],
                Monday: [false],
                Tuesday: [false],
                Wednesday: [false],
                Thursday: [false],
                Friday: [false],
                Saturday: [false],
            }),
        });
        console.log(this.newScheduleForm.controls);
    }
    get activeDaysArray() {
        return Object.keys(this.newScheduleForm.controls.active_days.controls);
    }
    onSubmit() {
        console.log(this.newScheduleForm.value);
    }
}
