import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/_services/device.service';

@Component({
  selector: 'service-test',
  templateUrl: './service-test.component.html',
  styleUrls: ['./service-test.component.scss'],
})
export class ServiceTestComponent implements OnInit {
  constructor(private _deviceService: DeviceService) {}

  ngOnInit(): void {
    // get latest data of all devices
    // TODO: add city and source parameters, i.e. getDeviceLatest('zagreb','ekokarta');
    this._deviceService.getDeviceLatest().subscribe((data) => {
      console.log('latest data:');
      console.log(data);
    });

    // get data for one device with start and end time values defined in UTC unix time
    // !important: start and end time must be declared either with 0 or using a 13 digit number
    var deviceId = 'a130bd80-a607-11eb-8bcc-c186228958f2';
    var start = 0; // 0 or 13 digits!
    var end = 2147483647000; // 13 digits!
    this._deviceService
      .getDeviceTimespan(deviceId, start, end)
      .subscribe((data) => {
        console.log(`device ${deviceId} data from ${start} to ${end}:`);
        console.log(data);
      });
  }
}
