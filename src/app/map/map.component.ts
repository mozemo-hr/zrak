import * as Leaflet from 'leaflet';
import { MarkerClusterGroup } from "leaflet.markercluster";
import { Component, OnInit, AfterContentInit } from '@angular/core';

const views = {
  zagreb: { lat: 45.8150, long: 15.9819, zoom: 13}
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterContentInit {
  
  map: Leaflet.Map;

  constructor() { }

  ngOnInit(): void {
  }
  
  ngAfterContentInit(): void {
    this.map = Leaflet.map('map').setView([views.zagreb.lat, views.zagreb.long], views.zagreb.zoom);
    
    /*
    More on Tile servers here – https://wiki.openstreetmap.org/wiki/Tile_servers
    https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
    https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png
    https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png
    */
    
    Leaflet
      .tileLayer(
        'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
        {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        })
      .addTo(this.map);
      
      var markers = new MarkerClusterGroup({disableClusteringAtZoom: 12, zoomToBoundsOnClick: true, spiderfyOnMaxZoom: false});
      markers.addLayer(Leaflet.circle([45.8107711,15.9516637], {
        color: '#FE9191',
        fillOpacity: 0.5,
        radius: 200
      }));
      markers.addLayer(Leaflet.circle([45.810,15.951], {
        color: '#FE9191',
        fillOpacity: 0.5,
        radius: 200
      }));
      
      markers.addLayer(Leaflet.circle([45.810196,15.9688975], {
        color: '#FE9191',
        fillOpacity: 0.5,
        radius: 200,
      }));
      this.map.addLayer(markers);
      
  }

}
