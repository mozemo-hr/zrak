import { Component, OnInit, Input } from '@angular/core';
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
  minimised: Boolean;

  private _city: string = 'zagreb';
  public get city(): string {
    return this._city;
  }
  @Input()
  public set city(val: string) {
    this._city = val;
    this.refreshDevices();
  }

  constructor(public deviceService: DeviceService) {}

  ngOnInit(): void {
    this.minimised = true;
    this.refreshDevices();
  }

  openDetails(device: Device): void {
    this.deviceService.selectedDevice = device;
  }

  toggleMinimised(): void {
    this.minimised = !this.minimised;
  }

  refreshDevices() {
    this.deviceService.getDeviceLatest(this.city).subscribe((data) => {
      this.devices = data.filter(
        (device) => device.x != null && device.y != null && device.pm25 != null
      );
    });
  }
}
