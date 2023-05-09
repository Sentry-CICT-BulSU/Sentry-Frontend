import { Component, OnInit } from '@angular/core';
import { filter, of, switchMap } from 'rxjs';
import { ISchedule, IUser } from 'src/app/core/models';
import { AuthService } from 'src/app/core/services/auth.service';
import { ScheduleService } from 'src/app/core/services/schedule.service';

interface ScheduleData {
  day: string;
  timeStart: string;
  timeEnd: string;
  subject: string;
  room: string;
}

@Component({
  selector: 'app-faculty-schedule',
  templateUrl: './faculty-schedule.component.html',
})
export class FacultyScheduleComponent implements OnInit {
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
  // scheduleData: ScheduleData[] = [
  //   {
  //     day: 'Wednesday',
  //     timeStart: '9:00 am',
  //     timeEnd: '11:00 am',
  //     subject: 'Capstone 2',
  //     room: 'IT1',
  //   },
  //   {
  //     day: 'Monday',
  //     timeStart: '7:00 am',
  //     timeEnd: '10:00 am',
  //     subject: 'Networking 2',
  //     room: 'IT2',
  //   },
  // ];

  schedules?: ISchedule[];
  user?: IUser;

  printThisPage() {
    window.print();
  }

  constructor(
    private schedulesService: ScheduleService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadSchedules();
  }

  loadSchedules() {
    this.authService.current_user_subject$
      ?.pipe(
        filter((user) => !!user),
        switchMap((user) =>
          user
            ? this.schedulesService.loadSchedules$({ fid: user.id })
            : of(undefined)
        )
      )
      .subscribe({
        next: (schedules) => {
          if (schedules) {
            this.schedules = schedules.data as ISchedule[];
            console.log(schedules);
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
