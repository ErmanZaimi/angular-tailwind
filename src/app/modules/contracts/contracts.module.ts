import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ContractsRoutingModule } from './contracts-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { FormsModule } from '@angular/forms';
import { ReusableTableModule } from './pages/reusable-table/reusable-table.module';
@NgModule({
  declarations: [],
  imports: [
    ContractsRoutingModule,
    CommonModule,
    AngularSvgIconModule.forRoot(),
    ReactiveFormsModule,
    NewPageComponent,
    FormsModule,
    ReusableTableModule
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())]
 
})
export class ContractsModule { }