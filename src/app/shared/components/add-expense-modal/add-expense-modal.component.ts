// add-expense-modal.component.ts
import { Component, Output, EventEmitter } from '@angular/core';

type ExpenseField = 'amount' | 'category' | 'description' | 'date' | 'title';

@Component({
  selector: 'app-add-expense-modal',
  templateUrl: './add-expense-modal.component.html',
  styleUrls: ['./add-expense-modal.component.scss']
})
export class AddExpenseModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<{ amount: number; category: string; description: string; date: string; title: string }>();

  amount: number | null = null;
  category: string = '';
  description: string = '';
  date: string = '';
  title: string = '';

  // Track if fields have been touched
  touched: Record<ExpenseField, boolean> = {
    amount: false,
    category: false,
    description: false,
    date: false,
    title: false,
  };

  onInputChange(field: ExpenseField) {
    this.touched[field] = true;
  }

  submit() {
    // Validate required fields
    if (this.amount === null || !this.category || !this.title || !this.date) {
      alert('Please fill in all required fields.');
      return; // Prevent submission
    }

    const newExpense = {
      amount: this.amount,
      category: this.category,
      description: this.description,
      date: this.date,
      title: this.title,
    };

    this.add.emit(newExpense); // Emit the expense
    this.close.emit(); // Close the modal
  }

  isFieldRequired(field: ExpenseField): boolean {
    return this.touched[field] && !this[field];
  }
}

