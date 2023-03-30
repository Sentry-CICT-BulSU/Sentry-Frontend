export interface IUser {
    id: number;
    name: string;
    type: string;
    email: string;
    email_verified_at?: string;
    created_at: string;
    updated_at: string;
}

export interface IUserTypes {
    cast: string[];
}
