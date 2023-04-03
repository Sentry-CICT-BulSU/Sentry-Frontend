import { IMetaData } from './meta-data.model';
import { ICollectionResponse } from './response.model';
import { IRoom } from './room.model';
import { ISection } from './section.model';
import { ISemester } from './semester.model';
import { ISubject } from './subject.model';
import { IUser } from './user.model';

export interface ISchedule extends IMetaData {
    id: number;
    adviser_id: IUser['id'];
    subject_id: ISubject['id'];
    semester_id: ISemester['id'];
    room_id: IRoom['id'];
    section_id: ISection['id'];
    date_start: string;
    date_end: string;
    time_start: string;
    time_end: string;
    active_days: string[];
}

export interface IScheduleCollection extends ICollectionResponse {
    data: ISchedule[] | ISchedule;
}
