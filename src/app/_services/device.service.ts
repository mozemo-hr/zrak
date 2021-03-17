import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http'
import { Device } from '../_models/device';
import { DeviceData } from '../_models/deviceData';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private httpClient: HttpClient) { }
  
  getDevices(): Observable<Device[]>{
    return this.httpClient.get<Device[]>(`${environment.apiUrl}/device/getDevices?pagesize=500&page=0`);
  }

  getDeviceKeys(deviceId: string): Observable<string[]>{
    return this.httpClient.get<string[]>(`${environment.apiUrl}/device/getdevicekeys?deviceid=${deviceId}`);
  }

  getDeviceDataLatest(deviceId: string, useStrictDataTypes: boolean, keys: string[]): Observable<DeviceData>{

    const body = { 'deviceId': `${deviceId}`, 'useStrictDataTypes': useStrictDataTypes, 'keys': keys };
    return this.httpClient.post<DeviceData>(`${environment.apiUrl}/device/getDeviceDataLatest`, body);
  }

  getDeviceDataTimespan(deviceId: string, limit: Number, agg: string, orderBy: string, useStrictDataTypes: boolean, keys: string[], startTs: number, endTs: number): Observable<DeviceData>{
    const body = { 'deviceId': `${deviceId}`, 'limit': limit, 'agg': `${agg}`, 'orderBy': `${orderBy}`, 'useStrictDataTypes': useStrictDataTypes, 'keys': keys, 'startTs': startTs, 'endTs': endTs };
    return this.httpClient.post<DeviceData>(`${environment.apiUrl}/device/getDeviceDataTimespan`, body);
  }
  
}