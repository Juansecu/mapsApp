import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .map-container {
        width: 100%;
        height: 100%;
      }

      .zoom-info {
        position: fixed;
        left: 3rem;
        bottom: 3rem;
        border-radius: 5px;
        width: 50%;
        padding: 0.7rem;
        background-color: white;
        z-index: 999;
      }
    `,
  ],
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {
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

    this.map.on('move', (event) => {
      const { lng, lat } = event.target.getCenter();
      this.mapPosition = [lng, lat];
    });
    this.map.on('zoom', () => (this.zoomLevel = this.map.getZoom()));
    this.map.on('zoomend', () => {
      if (this.map.getZoom() > 18) this.map.zoomTo(18);
    });
  }

  ngOnDestroy(): void {
    this.map.off('move', () => {});
    this.map.off('zoom', () => {});
    this.map.off('zoomend', () => {});
  }

  changeZoom(zoomIn: boolean): void {
    zoomIn ? this.map.zoomIn() : this.map.zoomOut();
    this.zoomLevel = this.map.getZoom();
  }

  onZoomChange(inputValue: any): void {
    this.map.zoomTo(inputValue * 1);
  }
}
