import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReusableTableComponent } from './reusable-table.component';
import { PaginationComponent } from '..//..//..//../shared/components/pagination/pagination.component';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component'; // Adjust the path accordingly

@NgModule({
  declarations: [ReusableTableComponent, PaginationComponent,SpinnerComponent ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ReusableTableComponent, PaginationComponent] // Export the component to make it available in other modules
})
export class ReusableTableModule { }

