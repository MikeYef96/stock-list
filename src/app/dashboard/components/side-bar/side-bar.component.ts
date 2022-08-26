import { Component } from '@angular/core';

import { SidenavItemInterface } from '../../interfaces/sidenav-item.interface';
import { navigationList } from '../../constants/side-nav-routes.constants';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {

  sideBarList: SidenavItemInterface[] = navigationList

}
