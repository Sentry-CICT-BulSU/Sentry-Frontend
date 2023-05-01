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
  daysOfWeek: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  timeslots: string[] = [
    '7:00 am',
    '8:00 am',
    '9:00 am',
    '10:00 am',
    '11:00 am',
    '12:00 pm',
    '1:00 pm',
    '2:00 pm',
    '3:00 pm',
    '4:00 pm',
    '5:00 pm',
    '6:00 pm',
  ];
  scheduleData: ScheduleData[] = [
    {
      day: 'Wednesday',
      timeStart: '9:00 am',
      timeEnd: '11:00 am',
      subject: 'Capstone 2',
      room: 'IT1',
    },
    {
      day: 'Monday',
      timeStart: '7:00 am',
      timeEnd: '10:00 am',
      subject: 'Networking 2',
      room: 'IT2',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  isSlotFilled(day: string, time: string): ScheduleData | undefined {
    return this.scheduleData.find((schedule) => {
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
