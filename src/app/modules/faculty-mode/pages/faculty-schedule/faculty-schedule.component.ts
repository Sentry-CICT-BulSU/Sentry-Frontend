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

  schedules?: ISchedule[];
  user?: IUser;

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
