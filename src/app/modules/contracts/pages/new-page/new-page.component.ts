import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../../layout/components/footer/footer.component';
import { NavbarComponent } from 'src/app/modules/layout/components/navbar/navbar.component';
import { SidebarComponent } from 'src/app/modules/layout/components/sidebar/sidebar.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.scss'],
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, NavbarComponent, RouterOutlet, FooterComponent, ReactiveFormsModule],
})
export class NewPageComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Value:', this.form.value);
    }
  }
}
