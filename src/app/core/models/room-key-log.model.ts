import { IMetaData } from './meta-data.model';
import { ICollectionResponse } from './response.model';
import { IRoomKey } from './room-key.model';
import { ISubject } from './subject.model';
import { IUser } from './user.model';

export interface IRoomKeyLog extends IMetaData {
    id: number;
    room_key_id: IRoomKey['id'];
    room_key?: IRoomKey;
    faculty_id: IUser['id'];
    faculty?: IUser | null;
    subject_id?: number;
    subject?: ISubject | null;
    status: string;
}

export interface IRoomKeyLogCollection extends ICollectionResponse {
    data: IRoomKeyLog[] | IRoomKeyLog;
}
