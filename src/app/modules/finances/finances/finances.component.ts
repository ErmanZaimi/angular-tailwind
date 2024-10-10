import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '..//../layout/components/sidebar/sidebar.component';
import { NavbarComponent } from '..//../layout/components/navbar/navbar.component';
import { FooterComponent } from '..//../layout/components/footer/footer.component';

@Component({
  selector: 'app-finances',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, NavbarComponent, FooterComponent],
  templateUrl: './finances.component.html',
})
export class FinancesComponent {}
