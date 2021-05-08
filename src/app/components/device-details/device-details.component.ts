import { Component, OnInit, Input } from '@angular/core';
import { Device } from '@app/_models/device';
import { DeviceService } from '@app/_services/device.service';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss'],
})
export class DeviceDetailsComponent implements OnInit {
  @Input() device: Device;

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {}

  closeDetails(): void {
    console.log('close details');
    this.deviceService.deselectDevice();
  }
}
