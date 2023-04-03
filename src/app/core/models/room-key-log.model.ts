import { IMetaData } from './meta-data.model';
import { ICollectionResponse } from './response.model';
import { IRoomKey } from './room-key.model';
import { IUser } from './user.model';

export interface IRoomKeyLog extends IMetaData {
    id: number;
    room_key_id: IRoomKey['id'];
    faculty_id: IUser['id'];
    status: string;
}

export interface IRoomKeyLogCollection extends ICollectionResponse {
    data: IRoomKeyLog[] | IRoomKeyLog;
}
