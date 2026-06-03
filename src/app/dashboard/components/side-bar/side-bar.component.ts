import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

import { SidenavItemInterface } from '../../interfaces/sidenav-item.interface';
import { navigationList } from '../../constants/side-nav-routes.constants';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  standalone: true,
  imports: [CommonModule, MatListModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarComponent {
  sideBarList: SidenavItemInterface[] = navigationList;
}
