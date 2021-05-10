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

  deviceLastMeasureTime() {
    return new Date(this.device.lastMeasureTime);
  }

  drawChart() {
    if (this.pmChart) {
      this.pmChart.destroy();
    }
    this.deviceService
      .getDeviceSevenDayAverage(this.device.deviceId)
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
        let pm25colors = [];
        let pm10colors = [];
        for (let el of data.pm) {
          labels.push(new Date(el.measureTime));
          pm25colors.push(this.deviceService.pmToColor(el.pm25, undefined));
          pm10colors.push(this.deviceService.pmToColor(undefined, el.pm10));
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
              borderColor: 'rgba(151, 151, 151, 1)',
              borderWidth: 1,
              borderDash: [10, 10],
              backgroundColor: 'transparent',
              pointBackgroundColor: pm25colors,
              pointBorderColor: pm25colors,
              pointRadius: 7,
            },
          ],
        };
        if (pm10) {
          chartData.datasets.push({
            label: 'PM10',
            data: pm10,
            fill: false,
            borderColor: 'rgba(151, 151, 151, 1)',
            borderWidth: 1,
            borderDash: [],
            backgroundColor: 'transparent',
            pointBackgroundColor: pm10colors,
            pointBorderColor: pm10colors,
            pointRadius: 7,
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
                  unit: 'day',
                  round: 'day',
                  displayFormats: {
                    day: 'd/M',
                  },
                },
              },
            },
          },
        };
        this.pmChart = new Chart(
          document.getElementById('chart') as HTMLCanvasElement,
          config
        );
      });
  }
}
