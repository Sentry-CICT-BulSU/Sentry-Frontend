import { IMetaData } from './meta-data.model';
import { ICollectionResponse } from './response.model';
import { ISemester } from './semester.model';
import { IUser } from './user.model';

export interface ISection extends IMetaData {
  id: number;
  semester_id: ISemester['id'];
  semester?: ISemester;
  adviser_id: IUser['id'];
  adviser?: IUser;
  name: string;
  status: string;
}

export interface ISectionCollection extends ICollectionResponse {
  data: ISection[] | ISection;
}
