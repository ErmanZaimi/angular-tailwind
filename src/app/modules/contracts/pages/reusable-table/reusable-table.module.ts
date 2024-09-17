import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReusableTableComponent } from './reusable-table.component';

@NgModule({
  declarations: [ReusableTableComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ReusableTableComponent] // Export the component to make it available in other modules
})
export class ReusableTableModule { }

