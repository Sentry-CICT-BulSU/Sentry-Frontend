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
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];
  timeslots: string[] = [
    '07:00 AM',
    '08:00 AM',
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
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

  isSlotFilled(day: string, time: string): ISchedule | undefined {
    return this.schedules?.find(schedule => {
      const days = schedule.active_days.join(',');
      if (!days.includes(day)) {
        return false;
      }
      const startTime = this.timeslots.indexOf(schedule.time_start);
      const endTime = this.timeslots.indexOf(schedule.time_end);
      const currentTime = this.timeslots.indexOf(time);
      return currentTime >= startTime && currentTime <= endTime;
    });
  }


  getSubject(day: string, time: string): string | undefined {
    const slot = this.isSlotFilled(day, time);
    return slot && slot.time_start === time ? slot.subject?.title : undefined;
  }

  getRoom(day: string, time: string): string | undefined {
    const slot = this.isSlotFilled(day, time);
    return slot && slot.time_start === time ? slot.room?.name : undefined;
  }
}
