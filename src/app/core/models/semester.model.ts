import { IMetaData } from './meta-data.model';
import { ICollectionResponse } from './response.model';

export interface ISemester extends IMetaData {
  id: number;
  name: string;
  academic_year: string;
  status: string;
  duration_start: string;
  duration_end: string;
}

export interface ISemesterCollection extends ICollectionResponse {
  data: ISemester[] | ISemester;
}
