export interface IUser {
    id: number;
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
    deleted_at: string;
}

export interface IUserTypes {
    cast: string[];
}

export interface IUserResponse {
    message: string;
    paginate?: IUserPaginate;
    user?: IUser;
    error?: string;
    deleted?: string;
    restore?: string;
}

export interface IUserPaginate {
    current_page: number;
    data: IUser[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url?: string;
    links: {
        url?: string;
        label?: string;
        active: boolean;
    }[];
    next_page_url?: string;
    path: string;
    per_page: number;
    prev_page_url?: string;
    to: number;
    total: number;
}
