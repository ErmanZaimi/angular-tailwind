import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancesRoutingModule } from './finances-routing.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ ], // No need to declare standalone components here
  imports: [
    CommonModule,
    FinancesRoutingModule,
    AngularSvgIconModule.forRoot(),
    FormsModule,
    
  ]
})
export class FinancesModule {}

