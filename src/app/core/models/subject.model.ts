import { ICollectionResponse } from './response.model';
import { IMetaData } from './meta-data.model';

export interface ISubject extends IMetaData {
    id: number;
    code: string;
    title: string;
    status: string;
}

export interface ISubjectCollection extends ICollectionResponse {
    data: ISubject[] | ISubject;
}
