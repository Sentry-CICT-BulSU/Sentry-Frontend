import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, forkJoin } from 'rxjs';
import { ISchedule } from 'src/app/core/models';
import { ScheduleService } from 'src/app/core/services/schedule.service';

interface ScheduleData {
  day: string;
  timeStart: string;
  timeEnd: string;
  subject: string;
  faculty: string;
  section: string;
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
      day: 'Wednesday,Friday',
      timeStart: '9:00 am',
      timeEnd: '11:00 am',
      subject: 'Capstone 2',
      faculty: 'Renato Adriano',
      section: 'BSIT 4P',
      room: 'IT1',
    },
    {
      day: 'Monday',
      timeStart: '7:00 am',
      timeEnd: '10:00 am',
      subject: 'Networking 2',
      faculty: 'Gabriel Galang',
      section: 'BSIT 4K',
      room: 'IT2',
    },
  ];

  schedules?: ISchedule[];

  constructor(
    private scheduleService: ScheduleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const obs = combineLatest([this.route.params, this.route.queryParams]);
    console.log('hit');
    obs.subscribe({
      next: ([params, query]) => {
        console.log(params, query);
        const id: number = +params['id'];
        const q: string = query['type'];
        const type_id: number = +query['id'];
        if (id && query) {
          this.scheduleService
            .loadSchedule$(id, { type: q, id: type_id })
            .subscribe({
              next: (schedule) => {
                this.schedules = schedule.data as ISchedule[];
                console.log(this.schedules);
              },
              error: (err) => console.debug(err),
            });
        }
      },
      error: (err) => console.debug(err),
    });
  }

  isSlotFilled(day: string, time: string): ScheduleData | undefined {
    return this.scheduleData.find(schedule => {
      const days = schedule.day.split(',');
      if (!days.includes(day)) {
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
