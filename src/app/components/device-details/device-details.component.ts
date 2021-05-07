import { Component, OnInit, Input } from '@angular/core';
import { Device } from '@app/_models/device';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss'],
})
export class DeviceDetailsComponent implements OnInit {
  @Input() device: Device;

  constructor() {}

  ngOnInit(): void {}
}
