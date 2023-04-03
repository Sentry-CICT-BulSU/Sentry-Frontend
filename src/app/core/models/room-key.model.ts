import { IMetaData } from './meta-data.model';
import { ICollectionResponse } from './response.model';
import { IRoom } from './room.model';

export interface IRoomKey extends IMetaData {
    id: number;
    room_id: IRoom['id'];
    status: string;
}
export interface IRoomKeyCollection extends ICollectionResponse {
    data: IRoomKey[] | IRoomKey;
}
