import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Device } from '../_models/device';
import { DeviceTimespan } from '../_models/deviceTimespan';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private readonly _selectedDevice = new BehaviorSubject<Device>(null);

  constructor(private httpClient: HttpClient) {}

  readonly selectedDevice$ = this._selectedDevice.asObservable();

  get selectedDevice(): Device {
    return this._selectedDevice.getValue();
  }

  set selectedDevice(val: Device) {
    this._selectedDevice.next(val);
  }

  deselectDevice(): void {
    this.selectedDevice = null;
  }

  getDeviceLatest(city): Observable<Device[]> {
    let params: any = {};
    if (city) {
      params.city = city;
    }
    return this.httpClient.get<Device[]>(
      `${environment.apiUrl}/device/getLatest`,
      { params: params }
    );
  }

  getDeviceTimespan(
    deviceId: string,
    startTs: number,
    endTs: number
  ): Observable<DeviceTimespan> {
    return this.httpClient.get<DeviceTimespan>(
      `${environment.apiUrl}/device/getTimespan?deviceId=${deviceId}&startTs=${startTs}&endTs=${endTs}`
    );
  }

  getDeviceSevenDayAverage(deviceId: string): Observable<DeviceTimespan> {
    return this.httpClient.get<DeviceTimespan>(
      `${environment.apiUrl}/device/getLastSevenDaysAverage?deviceId=${deviceId}`
    );
  }

  pmToColor = (pm25: number, pm10: number) => {
    const colours = [
      '#CBD244', // dobro
      '#CBD244', // prihvatljivo
      '#FFD53B', // umjereno
      '#FF7B7B', // loše
      '#D963FF', // vrlo loše
      '#D963FF', // izuzetno loše
    ];
    let pm25level: number, pm10level: number;

    if (pm25 == null) {
      pm25level = null;
    } else if (pm25 < 10) {
      pm25level = 0;
    } else if (pm25 < 20) {
      pm25level = 1;
    } else if (pm25 < 25) {
      pm25level = 2;
    } else if (pm25 < 50) {
      pm25level = 3;
    } else if (pm25 < 75) {
      pm25level = 4;
    } else {
      pm25level = 5;
    }

    if (pm10 == null) {
      pm10level = null;
    } else if (pm10 < 20) {
      pm10level = 0;
    } else if (pm10 < 40) {
      pm10level = 1;
    } else if (pm10 < 50) {
      pm10level = 2;
    } else if (pm10 < 100) {
      pm10level = 3;
    } else if (pm10 < 150) {
      pm10level = 4;
    } else {
      pm10level = 5;
    }

    return colours[Math.max(pm25level, pm10level)];
  };
}
