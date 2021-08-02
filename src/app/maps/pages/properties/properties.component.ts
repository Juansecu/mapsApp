import { Component } from '@angular/core';

import { IProperty } from '../../typings/Property';

import { PropertiesService } from '../../services/properties.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styles: [],
})
export class PropertiesComponent {
  properties: IProperty[] = this._propertiesService.properties;

  constructor(private readonly _propertiesService: PropertiesService) {}
}
