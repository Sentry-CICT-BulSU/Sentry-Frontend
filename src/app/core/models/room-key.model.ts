import { IMetaData } from './meta-data.model';
import { ICollectionResponse } from './response.model';
import { IRoomKeyLog } from './room-key-log.model';
import { IRoom } from './room.model';
import { ISchedule } from './schedule.model';

export interface IRoomKey extends IMetaData {
    id: number;
    room_id: IRoom['id'];
    room?: IRoom | null;
    schedules?: ISchedule[] | null;
    logs?: IRoomKeyLog[] | null;
    status: string;
}
export interface IRoomKeyCollection extends ICollectionResponse {
    data: IRoomKey[] | IRoomKey;
}
