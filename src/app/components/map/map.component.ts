import * as Leaflet from 'leaflet';
import { MarkerClusterGroup } from 'leaflet.markercluster';
import { Component, OnInit, AfterContentInit, Input } from '@angular/core';
import { DeviceService } from '@app/_services/device.service';

const views = {
  zagreb: { lat: 45.795, long: 15.9319, zoom: 12 },
  rijeka: { lat: 45.327, long: 14.442, zoom: 12 },
  split: { lat: 43.508, long: 16.44, zoom: 12 },
  pula: { lat: 44.8666, long: 13.8496, zoom: 13 },
};

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterContentInit {
  map: Leaflet.Map;

  private _city: string = 'zagreb';
  public get city(): string {
    return this._city;
  }
  @Input() //device: Device;
  public set city(val: string) {
    this._city = val;
    if (this.map) {
      const view = views[val];
      this.map.setView([view.lat, view.long], view.zoom);
    }
  }

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    this.map = Leaflet.map('map', {
      maxZoom: 20,
      minZoom: 6,
      zoomControl: false,
    }).setView([views.zagreb.lat, views.zagreb.long], views.zagreb.zoom);

    Leaflet.control
      .zoom({
        position: 'topright',
      })
      .addTo(this.map);

    /*
    More on Tile servers here – https://wiki.openstreetmap.org/wiki/Tile_servers
    https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
    https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png
    https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png
    */

    const tileLayer = Leaflet.tileLayer(
      'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    ).addTo(this.map);

    tileLayer.getContainer().style.filter = 'grayscale(0.8) opacity(75%)';

    this.deviceService.getDeviceLatest('').subscribe((data) => {
      var markers = new MarkerClusterGroup({
        // disableClusteringAtZoom: 12,
        disableClusteringAtZoom: 11,
        zoomToBoundsOnClick: true,
        spiderfyOnMaxZoom: false,
        showCoverageOnHover: false,
      });
      for (const device of data) {
        if (device.x == null || device.y == null || device.pm25 == null)
          continue;
        markers.addLayer(
          Leaflet.circle([device.y, device.x], {
            color: this.deviceService.pmToColor(device.pm25, device.pm10),
            fillOpacity: 0.6,
            radius: 200,
          }).on('click', (e) => {
            console.log('clicked ', device);
            this.deviceService.selectedDevice = device;
          })
        );
      }
      this.map.addLayer(markers);
    });
  }
}
