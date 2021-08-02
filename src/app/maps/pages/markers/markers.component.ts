import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

import { IMarker } from '../../typings/Marker';

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
  markers: IMarker[] = [];

  constructor() {}

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      center: this.mapPosition,
      container: this.mapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: this.zoomLevel,
    });

    this.getMarkers();
  }

  addMarker(): void {
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    const newMarker = new mapboxgl.Marker({ color, draggable: true })
      .setLngLat(this.mapPosition)
      .addTo(this.map);

    this.markers.push({
      color,
      marker: newMarker,
    });

    this.saveMarker();

    newMarker.on('dragend', () => this.saveMarker());
  }

  getMarkers(): void {
    if (!localStorage.getItem('markers')) return;

    const localMarkers: IMarker[] = JSON.parse(
      localStorage.getItem('markers')!
    );

    localMarkers.forEach((marker) => {
      const newMarker = new mapboxgl.Marker({
        color: marker.color,
        draggable: true,
      })
        .setLngLat(marker.lngLat!)
        .addTo(this.map);

      this.markers.push({
        color: marker.color,
        marker: newMarker,
      });

      newMarker.on('dragend', () => this.saveMarker());
    });
  }

  goToMarker(marker: mapboxgl.Marker): void {
    this.map.flyTo({ center: marker.getLngLat() });
  }

  removeMarker(event: MouseEvent, index: number): void {
    event.preventDefault();
    this.markers[index].marker?.remove();
    this.markers.splice(index, 1);
    this.saveMarker();
  }

  saveMarker(): void {
    const markersToSave: IMarker[] = [];

    this.markers.forEach((marker) => {
      const color = marker.color;
      const { lng, lat } = marker.marker!.getLngLat();

      markersToSave.push({
        color,
        lngLat: [lng, lat],
      });
    });

    localStorage.setItem('markers', JSON.stringify(markersToSave));
  }
}
