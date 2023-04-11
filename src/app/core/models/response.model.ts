export interface ICollectionResponse {
    // pagination
    links?: {
        first: string;
        last: string;
        prev?: string | null;
        next?: string | null;
    };
    meta?: {
        current_page: number;
        from: number;
        last_page: number;
        links: {
            url?: string | null;
            label: string;
            active: boolean;
        }[];
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
}

export interface IResponse {
    message?: string;
    error?: string;
    deleted?: string;
    restore?: string;
}
