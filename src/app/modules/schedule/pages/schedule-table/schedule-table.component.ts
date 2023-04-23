import { Component, OnInit } from '@angular/core';

interface ScheduleData {
  day: string;
  timeStart: string;
  timeEnd: string;
  subject: string;
  room: string;
}

@Component({
  selector: 'app-schedule-table',
  templateUrl: './schedule-table.component.html',
})
export class ScheduleTableComponent implements OnInit {
  daysOfWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',];
  timeslots: string[] = ['7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm'];
  scheduleData: ScheduleData[] = [
    { day: 'Wednesday', timeStart: '9am', timeEnd: '11am', subject: 'Capstone 2', room: 'IT1' },
    { day: 'Monday', timeStart: '7am', timeEnd: '10am', subject: 'Networking 2', room: 'IT2' },
  ];

  constructor() { }

  ngOnInit(): void { }

  isSlotFilled(day: string, time: string): ScheduleData | undefined {
    return this.scheduleData.find(schedule => {
      if (schedule.day !== day) {
        return false;
      }
      const startTime = this.timeslots.indexOf(schedule.timeStart);
      const endTime = this.timeslots.indexOf(schedule.timeEnd);
      const currentTime = this.timeslots.indexOf(time);
      return currentTime >= startTime && currentTime <= endTime;
    });
  }


  getSubject(day: string, time: string): string | undefined {
    const slot = this.isSlotFilled(day, time);
    return slot && slot.timeStart === time ? slot.subject : undefined;
}

getRoom(day: string, time: string): string | undefined {
    const slot = this.isSlotFilled(day, time);
    return slot && slot.timeStart === time ? slot.room : undefined;
}


}
