import * as Leaflet from 'leaflet';
import { MarkerClusterGroup } from 'leaflet.markercluster';
import { Component, OnInit, AfterContentInit } from '@angular/core';
import { DeviceService } from '@app/_services/device.service';

const views = {
  zagreb: { lat: 45.795, long: 15.9319, zoom: 12 },
};

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterContentInit {
  map: Leaflet.Map;

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

    this.deviceService.getDeviceLatest().subscribe((data) => {
      var markers = new MarkerClusterGroup({
        disableClusteringAtZoom: 12,
        zoomToBoundsOnClick: true,
        spiderfyOnMaxZoom: false,
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
