import { Component, OnInit } from '@angular/core';
import { Device } from '@app/_models/device';
import { DeviceService } from '@app/_services/device.service';

@Component({
  selector: 'app-stations-panel',
  templateUrl: './stations-panel.component.html',
  styleUrls: ['./stations-panel.component.scss'],
})
export class StationsPanelComponent implements OnInit {
  devices: Device[];
  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.deviceService.getDeviceLatest().subscribe((data) => {
      this.devices = data;
    });
  }
}
