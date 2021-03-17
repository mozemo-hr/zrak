import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private httpClient: HttpClient) { }

  // authenticate(): Observable<any>{
  //   let body = {'username':`${environment.username}`, 'password':`${environment.password}`};
  //   return this.httpClient.post(`${environment.apiUrl}/auth/login`, body);
  // }
}
