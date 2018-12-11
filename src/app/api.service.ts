import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface measurements {
  temp: Number;
  pressure: Number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  connectToServer(url, port): Observable<any> {
    return this.http.get<any>('http://localhost:5000/api/connect', {
      params: {
        url: url,
        port: port
      }
    });
  }

  browseServer(name): Observable<any> {
    return this.http.get<any>('http://localhost:5000/api/browse', {
      params: {
        name: name
      }
    });
  }

  monitorVariable(id, stdVar): Observable<any> {
    return this.http.get<any>('http://localhost:5000/api/monitorVariable', {
      params: {
        id: id,
        stdVar: stdVar
      }
    });
  }

  simpleVarRead(id): Observable<any> {
    return this.http.get<any>('http://localhost:5000/api/readVariable', {
      params: {
        id: id
      }
    });
  }

  disconnectFromServer(): Observable<any> {
    return this.http.get<any>('http://localhost:5000/api/disconnect');
  }
}
