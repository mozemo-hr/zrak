import {
  Component,
  OnInit,
  Input,
  AfterContentInit,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import Chart from 'chart.js/auto';
// import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-luxon';
import { DateTime } from 'luxon';

import { Device } from '@app/_models/device';
import { DeviceService } from '@app/_services/device.service';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss'],
})
export class DeviceDetailsComponent implements OnDestroy {
  private pmChart: Chart;

  private _device: Device;
  public get device(): Device {
    return this._device;
  }
  @Input() //device: Device;
  public set device(val: Device) {
    this._device = val;
    this.drawChart();
  }

  constructor(private deviceService: DeviceService) {}

  ngOnDestroy(): void {
    if (this.pmChart) {
      this.pmChart.destroy();
    }
  }

  closeDetails(): void {
    this.deviceService.deselectDevice();
  }

  deviceColor() {
    return this.deviceService.pmToColor(this.device.pm25, this.device.pm10);
  }
  deviceColorPM25() {
    return this.deviceService.pmToColor(this.device.pm25, undefined);
  }
  deviceColorPM10() {
    return this.deviceService.pmToColor(undefined, this.device.pm10);
  }

  deviceSource() {
    let sourceName = '';
    if (this.device.source.toLocaleLowerCase() === 'mozemo') {
      sourceName = 'Možemo!';
    } else {
      sourceName = this.device.source;
    }
    return ` – ${sourceName}`;
  }

  drawChart() {
    if (this.pmChart) {
      this.pmChart.destroy();
    }
    var start = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).getTime(); // 0 or 13 digits!
    var end = new Date().getTime(); // 13 digits!
    this.deviceService
      .getDeviceTimespan(this.device.deviceId, start, end)
      .subscribe((data) => {
        data.pm = data.pm.sort((a, b) =>
          a.measureTime > b.measureTime ? 1 : -1
        );
        let pm10 = null;
        if (data.pm.length > 0 && data.pm[0] != null) {
          pm10 = [];
        }
        let pm25 = [];
        let labels = [];
        for (let el of data.pm) {
          labels.push(new Date(el.measureTime));
          if (pm10) {
            pm10.push(el.pm10);
          }
          pm25.push(el.pm25);
        }
        const chartData = {
          labels: labels,
          datasets: [
            {
              label: 'PM2.5',
              data: pm25,
              fill: false,
              borderColor: 'rgba(255, 123, 123, 0.5)',
              backgroundColor: 'rgba(255, 123, 123, 0.5)',
            },
          ],
        };
        if (pm10) {
          chartData.datasets.push({
            label: 'PM10',
            data: pm10,
            fill: false,
            borderColor: 'rgba(200, 212, 0, 0.5)',
            backgroundColor: 'rgba(200, 212, 0, 0.5)',
          });
        }
        const config: any = {
          type: 'line',
          data: chartData,
          options: {
            scales: {
              x: {
                type: 'time',
                time: {
                  displayFormats: {
                    day: 'd.M',
                  },
                },
              },
            },
          },
        };
        // const config: any = {
        //   type: 'line',
        //   data: {
        //     datasets: [{ data: data.pm }],
        //   },
        //   options: {
        //     parsing: {
        //       xAxisKey: 'measureTime',
        //       yAxisKey: 'pm25',
        //     },
        //     scales: {
        //       x: {
        //         type: 'time',
        //       },
        //     },
        //   },
        // };
        this.pmChart = new Chart(
          document.getElementById('chart') as HTMLCanvasElement,
          config
        );
      });
  }
}
