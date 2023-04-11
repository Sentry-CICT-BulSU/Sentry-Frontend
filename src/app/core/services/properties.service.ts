import { HttpHeaders } from '@angular/common/http';

export class PropertiesService {
    options = {
        headers: new HttpHeaders({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
        }),
    };
}
