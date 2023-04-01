import { ICollectionResponse } from "./response.model";

export interface IUser {
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
    created_at: string;
    updated_at: string;
    deleted_at?: string;
}

export interface IUserTypes {
    cast: string[];
}

export interface IUserResponse {
    message?: string;
    error?: string;
    deleted?: string;
    restore?: string;
}

export interface IUserCollectionResponse extends ICollectionResponse {
    data: IUser[] | IUser;
}
