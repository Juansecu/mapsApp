import { Injectable } from '@angular/core';

import { IProperty } from '../typings/Property';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  private readonly _properties: IProperty[] = [
    {
      title: 'Residential house, Canada',
      description: 'Beautiful property in Katana, Canada',
      lngLat: [-75.92722289474008, 45.280015511264466],
    },
    {
      title: 'Beach house, Mexico',
      description: 'Beautiful beach house in Acapulco, Mexico',
      lngLat: [-99.91287720907991, 16.828940930185748],
    },
    {
      title: 'Appartment, Argentina',
      description:
        'Luxurious apartment in the heart of Buenos Aires, Argentina',
      lngLat: [-58.430166677283445, -34.57150108832866],
    },
    {
      title: 'Business premises, Spain ',
      description:
        'Commercial premises available in Madrid, Spain, near El Jardín Secreto',
      lngLat: [-3.7112735618380177, 40.42567285425766],
    },
  ];

  get properties(): IProperty[] {
    return this._properties;
  }

  constructor() {}
}
