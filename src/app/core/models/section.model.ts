import { IMetaData } from './meta-data.model';
import { ICollectionResponse } from './response.model';
import { ISemester } from './semester.model';
import { IUser } from './user.model';

export interface ISection extends IMetaData {
    id: number;
    semester_id: ISemester['id'];
    adviser_id: IUser['id'];
    name: string;
    status: string;
}

export interface ISectionCollection extends ICollectionResponse {
    data: ISection[] | ISection;
}
