import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styles: [
    `
      div {
        width: 100%;
        height: 12rem;
      }
    `,
  ],
})
export class MiniMapComponent implements AfterViewInit {
  @Input() lngLat!: [number, number];
  @ViewChild('mapContainer') mapContainer!: ElementRef;

  constructor() {}

  ngAfterViewInit(): void {
    const map = new Map({
      center: this.lngLat,
      container: this.mapContainer.nativeElement,
      interactive: false,
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 15,
    });

    new Marker().setLngLat(this.lngLat).addTo(map);
  }
}
