import { Component } from '@angular/core';

import { IRoute } from '../../typings/Route';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [],
})
export class MenuComponent {
  routes: IRoute[] = [
    {
      name: 'Full Screen',
      path: 'maps/fullscreen',
    },
    {
      name: 'Zoom Range',
      path: 'maps/zoom-range',
    },
    {
      name: 'Markers',
      path: 'maps/markers',
    },
    {
      name: 'Properties',
      path: 'maps/properties',
    },
  ];
}
