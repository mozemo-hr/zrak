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
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
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
      let lastSelected = null;
      let lastSelectedIcon = null;

      for (const device of data) {
        if (device.x == null || device.y == null || device.pm25 == null)
          continue;
        const color = this.deviceService.pmToColor(
          device.pm25,
          device.pm10,
          device.lastMeasureTime
        );
        const svg = `<svg width="79" height="79" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity=".9" filter="url(#filter0_d)"><path d="M39.5 70a29.5 29.5 0 100-59 29.5 29.5 0 000 59z" fill="#fff"/></g><g filter="url(#filter1_d)"><path d="M39.5 48a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" fill="${color}"/></g><defs><filter id="filter0_d" x="0" y="0" width="79" height="79" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="-1"/><feGaussianBlur stdDeviation="5"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter><filter id="filter1_d" x="22" y="22" width="35" height="35" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="-1"/><feGaussianBlur stdDeviation="5"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`;
        const icon = Leaflet.icon({
          iconUrl: 'data:image/svg+xml;base64,' + btoa(svg),
          iconSize: [76, 76],
        });
        const svgSelected = `<svg width="96" height="96" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity=".8" filter="url(#filter0_d)"><path d="M48 87a38 38 0 100-76 38 38 0 000 76z" fill="${color}"/></g><g opacity=".8" filter="url(#filter1_d)"><path d="M48 60a10 10 0 100-21 10 10 0 000 21z" fill="${color}"/><path d="M57 50a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#fff" stroke-width="3"/></g><defs><filter id="filter0_d" x="0" y="0" width="96" height="96" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="-1"/><feGaussianBlur stdDeviation="5"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter><filter id="filter1_d" x="27" y="28" width="41" height="41" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="-1"/><feGaussianBlur stdDeviation="5"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`;
        const iconSelected = Leaflet.icon({
          iconUrl: 'data:image/svg+xml;base64,' + btoa(svgSelected),
          iconSize: [76, 76],
        });
        markers.addLayer(
          Leaflet.marker([device.y, device.x], { icon: icon }).on(
            'click',
            (e) => {
              console.log('clicked ', device);
              this.deviceService.selectedDevice = device;
              e.target.setIcon(iconSelected);
              if (lastSelected) {
                lastSelected.setIcon(lastSelectedIcon);
              }
              lastSelected = e.target;
              lastSelectedIcon = icon;
            }
          )
        );
      }
      this.map.addLayer(markers);
    });
  }
}
