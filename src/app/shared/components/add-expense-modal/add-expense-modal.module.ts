// add-expense-modal.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AddExpenseModalComponent } from './add-expense-modal.component';

@NgModule({
  declarations: [AddExpenseModalComponent], // Declare the component
  imports: [
    CommonModule, // Import CommonModule for common directives
    FormsModule   // Import FormsModule for ngModel
  ],
  exports: [AddExpenseModalComponent] // Export the component for use in other modules
})
export class AddExpenseModalModule {}
