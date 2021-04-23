import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http'
import { Device } from '../_models/device';
import { DeviceTimespan } from '../_models/deviceTimespan';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private httpClient: HttpClient) { }
  
  getDeviceLatest(): Observable<Device[]>{
    return this.httpClient.get<Device[]>(`${environment.apiUrl}/device/getLatest`);
  }

  getDeviceTimespan(deviceId: string, startTs: number, endTs: number): Observable<DeviceTimespan>{
    return this.httpClient.get<DeviceTimespan>(`${environment.apiUrl}/device/getTimespan?deviceId=${deviceId}&startTs=${startTs}&endTs=${endTs}`);
  }
  
}