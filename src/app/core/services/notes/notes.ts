import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../env/environment';

@Injectable({
  providedIn: 'root',
})
export class Notes {
  constructor (private httpClient: HttpClient){}

  addNotes(data:object):Observable<any>{
    return this.httpClient.post(`${environment.BASE_URL}/api/v1/notes`, data);
  }

  getUserNotes(): Observable<any>{
    return this.httpClient.get(`${environment.BASE_URL}/api/v1/notes`);
  }

  updateNotes(id:string, data:object): Observable<any>{
    return this.httpClient.put(`${environment.BASE_URL}/api/v1/notes/${id}`, data)
  }

  deleteNotes(id:string): Observable<any>{
    return this.httpClient.delete(`${environment.BASE_URL}/api/v1/notes/${id}`)
  }
}
