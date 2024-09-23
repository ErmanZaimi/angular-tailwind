import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddContractModalComponent } from './add-contract-modal.component';

@NgModule({
  declarations: [AddContractModalComponent],
  imports: [
    CommonModule,
    FormsModule // Important to enable ngModel
  ],
  exports: [AddContractModalComponent] // Export the component
})
export class AddContractModalModule {}
