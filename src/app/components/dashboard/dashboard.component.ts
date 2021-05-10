import { Component, OnInit } from '@angular/core';
import { DeviceService } from '@app/_services/device.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(public deviceService: DeviceService) {}

  ngOnInit(): void {}
}
