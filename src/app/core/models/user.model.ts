import { IMetaData } from './meta-data.model';
import { ICollectionResponse } from './response.model';

export interface IUser extends IMetaData {
    id: number;
    profile_img?: string | null;
    first_name: string;
    last_name: string;
    full_name: string;
    type: string;
    position: string;
    college: string;
    contact: string;
    status: string;
    email: string;
    email_verified_at?: string | null;
}

export interface IUserTypes {
    cast: string[];
}

export interface IUserCollection extends ICollectionResponse {
    data: IUser[] | IUser;
}
