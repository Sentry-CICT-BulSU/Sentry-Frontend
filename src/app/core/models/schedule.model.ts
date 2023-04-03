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
    adviser?: IUser;

    subject_id: ISubject['id'];
    subject?: ISubject;

    semester_id: ISemester['id'];
    semester?: ISemester;

    room_id: IRoom['id'];
    room?: IRoom;

    section_id: ISection['id'];
    section?: ISection;

    date_start: string;
    date_end: string;
    time_start: string;
    time_end: string;
    active_days: string[];
}

export interface IScheduleCollection extends ICollectionResponse {
    data: ISchedule[] | ISchedule;
}
