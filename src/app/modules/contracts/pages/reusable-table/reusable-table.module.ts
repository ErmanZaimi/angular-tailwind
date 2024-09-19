import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReusableTableComponent } from './reusable-table.component';
import { PaginationComponent } from '..//..//..//../shared/components/pagination/pagination.component';

@NgModule({
  declarations: [ReusableTableComponent,  PaginationComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ReusableTableComponent] // Export the component to make it available in other modules
})
export class ReusableTableModule { }

