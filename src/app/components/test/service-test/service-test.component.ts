import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/_services/device.service';

@Component({
  selector: 'service-test',
  templateUrl: './service-test.component.html',
  styleUrls: ['./service-test.component.scss']
})
export class ServiceTestComponent implements OnInit {

  constructor(private _deviceService: DeviceService) { }

  ngOnInit(): void {
    // get all devices
    this._deviceService.getDevices().subscribe(data => {
      console.log('All current devices:')
      console.log(data);

      // forEach each device
      data.forEach(value =>{
        let deviceId = value.deviceId;

        // get value keys for each device (i.e. pm2.5, pm10,...)
        this._deviceService.getDeviceKeys(deviceId).subscribe(data=>{

          // for testing purposes take just pm2.5 and pm10 keys
          let keys = [];
          keys.push(data[0]);
          keys.push(data[1]);

          // get latest readings for each device for pm2.5 and pm10
          this._deviceService.getDeviceDataLatest(deviceId, false, keys).subscribe(data=>{
            console.log('Latest pm2.5 and pm10 data of each device:')
            console.log(data);
          });

          this._deviceService.getDeviceDataTimespan(deviceId, 100, 'NONE', 'DESC', false, keys, 0, 1613649176000).subscribe(data=>{
            console.log('Timespan pm2.5 and pm10 data of each device:')
            console.log(data);
          })
        })
      });
    })
  }

}
