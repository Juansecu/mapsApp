import { Marker } from 'mapbox-gl';

export interface IMarker {
  color: string;
  marker?: Marker;
  lngLat?: [number, number];
}
