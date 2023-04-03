import { IMetaData } from './meta-data.model';
import { ICollectionResponse } from './response.model';

export interface IRoom extends IMetaData {
    id: number;
    name: string;
    location: string;
    status: string;
}

export interface IRoomCollection extends ICollectionResponse {
    data: IRoom[] | IRoom;
}
