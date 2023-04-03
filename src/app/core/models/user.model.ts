import { IMetaData } from './meta-data.model';
import { ICollectionResponse } from './response.model';

export interface IUser extends IMetaData {
    id: number;
    profile_img?: string;
    first_name: string;
    last_name: string;
    type: string;
    position: string;
    college: string;
    contact: string;
    status: string;
    email: string;
    email_verified_at?: string;
}

export interface IUserTypes {
    cast: string[];
}

export interface IUserCollection extends ICollectionResponse {
    data: IUser[] | IUser;
}
