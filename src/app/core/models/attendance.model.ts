import { IMetaData } from './meta-data.model';
import { ICollectionResponse } from './response.model';
import { ISchedule } from './schedule.model';
import { IUser } from './user.model';

export interface IAttendance extends IMetaData {
  id: number;
  user_id?: number;
  user?: IUser;
  schedule_id?: number;
  schedule: ISchedule;
  status: string;
  remarks?: string;
  attachments?: string;
}
export interface IAttendanceCollection extends ICollectionResponse {
  data: IAttendance | IAttendance[];
}
