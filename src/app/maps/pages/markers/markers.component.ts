import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styles: [
    `
      .list-group {
        position: fixed;
        top: 2rem;
        left: 2rem;
        z-index: 99;
        cursor: pointer;
        transition: all 0.5s;
      }

      .list-group:hover {
        opacity: 0.8;
      }

      .map-container {
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class MarkersComponent implements AfterViewInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef;

  map!: mapboxgl.Map;

  zoomLevel = 10;
  mapPosition: [number, number] = [-75.921029433568, 45.28719674822362];

  constructor() {}

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      center: this.mapPosition,
      container: this.mapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: this.zoomLevel,
    });
  }

  addMarker(): void {
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    const newMarker = new mapboxgl.Marker({ color, draggable: true })
      .setLngLat(this.mapPosition)
      .addTo(this.map);
  }

  goToMarker(): void {}
}
