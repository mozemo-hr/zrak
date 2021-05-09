import { Component, OnInit } from '@angular/core';
import { Device } from '@app/_models/device';
import { DeviceService } from '@app/_services/device.service';

@Component({
  selector: 'app-devices-panel',
  templateUrl: './devices-panel.component.html',
  styleUrls: ['./devices-panel.component.scss'],
})
export class DevicesPanelComponent implements OnInit {
  devices: Device[];
  selectedDevice: Device;
  constructor(public deviceService: DeviceService) {}

  ngOnInit(): void {
    this.deviceService.getDeviceLatest('zagreb').subscribe((data) => {
      this.devices = data.filter(
        (device) => device.x != null && device.y != null && device.pm25 != null
      );
    });
  }

  openDetails(device: Device): void {
    this.deviceService.selectedDevice = device;
  }
}
