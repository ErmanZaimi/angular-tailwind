import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddIncomeModalComponent } from './add-income-modal.component';

@NgModule({
  declarations: [AddIncomeModalComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [AddIncomeModalComponent]
})
export class AddIncomeModalModule {}
