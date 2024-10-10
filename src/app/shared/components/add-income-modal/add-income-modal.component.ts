import { Component, Output, EventEmitter } from '@angular/core';

type IncomeField = 'amount' | 'Category' | 'description' | 'date' | 'title';

@Component({
  selector: 'app-add-income-modal',
  templateUrl: './add-income-modal.component.html',
  styleUrls: ['./add-income-modal.component.scss']
})
export class AddIncomeModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<{ amount: number; Category: string; description: string; date: string; title: string }>();

  amount: number | null = null;
  Category: string = ''; // Keep this with a capital 'C'
  description: string = '';
  date: string = '';
  title: string = '';

  touched: Record<IncomeField, boolean> = {
    amount: false,
    Category: false, // Use capital 'C' here
    description: false,
    date: false,
    title: false,
  };

  onInputChange(field: IncomeField) {
    this.touched[field] = true;
  }

  submit() {
    if (this.amount === null || !this.Category || !this.title || !this.date) {
      alert('Please fill in all required fields.');
      return;
    }

    const newIncome = {
      amount: this.amount,
      Category: this.Category, // Use capital 'C'
      description: this.description,
      date: this.date,
      title: this.title,
    };

    this.add.emit(newIncome); // Emit the income
    this.close.emit(); // Close the modal
  }

  isFieldRequired(field: IncomeField): boolean {
    return this.touched[field] && !this[field as keyof AddIncomeModalComponent]; // Type assertion
  }
}
