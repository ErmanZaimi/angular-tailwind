import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../layout/components/sidebar/sidebar.component';
import { NavbarComponent } from '../layout/components/navbar/navbar.component';
import { FooterComponent } from '../layout/components/footer/footer.component';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, NavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './contracts..component.html',
})
export class ContractsComponent {}
