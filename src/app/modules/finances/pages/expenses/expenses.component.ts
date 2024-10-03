import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReusableTableModule } from '../../../contracts/pages/reusable-table/reusable-table.module';
import { StrapiService } from 'src/app/core/services/strapi.service';
import { AddExpenseModalModule } from '../../../../shared/components/add-expense-modal/add-expense-modal.module';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-expenses',
  standalone: true,
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
  imports: [FormsModule, CommonModule, ReusableTableModule, AddExpenseModalModule]
})
export class ExpensesComponent implements OnInit {

  
  isModalOpen: boolean = false;

  totalExpenses = 0;
  newExpense = {
    title: '',
    amount: 0,
    date: '',
    description: '',
    category: ''
  };
  pastExpenses: any[] = [];
  categories = ['Food', 'Transport', 'Utilities', 'Entertainment'];
  columns = [
    { header: 'Title', field: 'title', sortable: true, editable: true },
    { header: 'Amount', field: 'amount', sortable: true, editable: true },
    { header: 'Date', field: 'date', sortable: true, editable: true },
    { header: 'Category', field: 'category', sortable: true, editable: true },
    { header: 'Actions', field: 'actions', sortable: false }
];

  currentPage = 1; // Current page for pagination
  itemsPerPage = 5; // Items per page
  searchTerm = ''; // Search term
  sortField = ''; // Field to sort by
  sortOrder: 'asc' | 'desc' = 'asc'; // Sort order
  totalPages = 0;
  totalItems: number = 0;

  constructor(private strapiService: StrapiService) {}

  ngOnInit(): void {
    this.fetchExpenses();
  }
  fetchExpenses(): void {
    const page = this.currentPage;
    const itemsPerPage = this.itemsPerPage;
    const searchTerm = this.searchTerm.trim();
    const sort = this.sortField ? [{ field: this.sortField, order: this.sortOrder }] : [];
    
    console.log('Fetching expenses with:', { page, itemsPerPage, searchTerm, sort });
  
    this.strapiService.getExpenses(page, itemsPerPage, searchTerm, sort)
      .subscribe(
        (response: any) => {
          console.log('API Response:', response);
          
          const newItems = response.data.map((item: any) => ({
            id: item.id,
            title: item.attributes.title,
            amount: item.attributes.amount,
            date: item.attributes.date,
            category: item.attributes.category
          }));
          this.pastExpenses = newItems;  
          this.totalItems = response.meta.pagination.total;
        },
        error => {
          console.error('Error fetching expenses:', error);
        }
      );
  }
  
  filterData(): void {
    this.currentPage = 1; // Reset to the first page when filtering
    console.log('Search term:', this.searchTerm);
    this.fetchExpenses(); // Re-fetch expenses based on the search term
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage; // Update the current page
    console.log(`Current page set to: ${this.currentPage}`);
    this.fetchExpenses(); // Fetch expenses for the new page
  }

  onSortChange(sort: { field: string; order: 'asc' | 'desc' }): void {
    this.sortField = sort.field; // Update sort field
    this.sortOrder = sort.order; // Update sort order
    this.fetchExpenses(); // Re-fetch expenses with new sorting
  }

  openAddExpenseModal() {
    this.isModalOpen = true;
  }
  
handleAddExpense(expense: { amount: number; category: string; description: string; date: string; title: string }) {
  this.strapiService.createExpense(expense).subscribe(
    (response) => {
      console.log('Expense added:', response);
      this.fetchExpenses(); // Refresh the list of expenses
    },
    (error) => {
      console.error('Error adding expense:', error);
      // Optionally show an error message to the user
    }
  );
}

handleDeleteExpense(expense: any) {
  this.strapiService.deleteExpense(expense.id).subscribe(
    () => {
      console.log('Deleted expense:', expense);
      this.pastExpenses = this.pastExpenses.filter(e => e.id !== expense.id);
    },
    (error: HttpErrorResponse) => {
      console.error('Error deleting expense:', error);
    }
  );
}
handleUpdateExpense(expense: any) {
  this.strapiService.updateExpense(expense.id, expense).subscribe(
    () => {
      console.log('Updated expense:', expense);
      this.fetchExpenses(); // Refresh the list of expenses
    },
    (error: HttpErrorResponse) => {
      console.error('Error updating expense:', error);
    }
  );
}

}
