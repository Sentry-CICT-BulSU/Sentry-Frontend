import { ICollectionResponse } from './response.model';
import { IMetaData } from './meta-data.model';
import { ISection } from './section.model';

export interface ISubject extends IMetaData {
    id: number;
    section_id: ISection['id'];
    code: string;
    title: string;
    status: string;
}

export interface ISubjectCollection extends ICollectionResponse {
    data: ISubject[] | ISubject;
}
