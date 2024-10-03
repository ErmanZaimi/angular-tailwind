import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReusableTableModule } from '../../../contracts/pages/reusable-table/reusable-table.module';
import { StrapiService } from 'src/app/core/services/strapi.service';
import { AddIncomeModalModule } from '../../../../shared/components/add-income-modal/add-income-modal.module';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-income',
  standalone: true,
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss'],
  imports: [FormsModule, CommonModule, ReusableTableModule,AddIncomeModalModule]
})
export class IncomeComponent implements OnInit {

  isModalOpen: boolean = false;

  totalIncome = 0;
  newIncome = {
    title: '',
    amount: 0,
    date: '',
    description: '',
    category: ''
  };
  pastIncome: any[] = [];
  categories = ['Salary', 'Freelance', 'Investments', 'Other'];
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
  totalItems: number = 0;

  constructor(private strapiService: StrapiService) {}

  ngOnInit(): void {
    this.fetchIncome();
  }

  fetchIncome(): void {
    const page = this.currentPage;
    const itemsPerPage = this.itemsPerPage;
    const searchTerm = this.searchTerm.trim();
    const sort = this.sortField ? [{ field: this.sortField, order: this.sortOrder }] : [];

    console.log('Fetching income with:', { page, itemsPerPage, searchTerm, sort });

    this.strapiService.getIncome(page, itemsPerPage, searchTerm, sort)
      .subscribe(
        (response: any) => {
          console.log('API Response:', response);
          
          const newItems = response.data.map((item: any) => ({
            id: item.id,
            title: item.attributes.title,
            amount: item.attributes.amount,
            date: item.attributes.date,
            category: item.attributes.Category
          }));
          this.pastIncome = newItems;  
          this.totalItems = response.meta.pagination.total;
        },
        error => {
          console.error('Error fetching income:', error);
        }
      );
  }
  
  filterData(): void {
    this.currentPage = 1; // Reset to the first page when filtering
    console.log('Search term:', this.searchTerm);
    this.fetchIncome(); // Re-fetch income based on the search term
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage; // Update the current page
    console.log(`Current page set to: ${this.currentPage}`);
    this.fetchIncome(); // Fetch income for the new page
  }

  onSortChange(sort: { field: string; order: 'asc' | 'desc' }): void {
    this.sortField = sort.field; // Update sort field
    this.sortOrder = sort.order; // Update sort order
    this.fetchIncome(); // Re-fetch income with new sorting
  }

  openAddIncomeModal() {
    this.isModalOpen = true;
  }

  handleAddIncome(income: { amount: number; Category: string; description: string; date: string; title: string }) {
    this.strapiService.createIncome(income).subscribe(
      (response) => {
        console.log('Income added:', response);
        this.fetchIncome(); // Refresh the list of income
      },
      (error) => {
        console.error('Error adding income:', error);
      }
    );
  }

  handleDeleteIncome(income: any) {
    this.strapiService.deleteIncome(income.id).subscribe(
      () => {
        console.log('Deleted income:', income);
        this.pastIncome = this.pastIncome.filter(i => i.id !== income.id);
      },
      (error: HttpErrorResponse) => {
        console.error('Error deleting income:', error);
      }
    );
  }

  handleUpdateIncome(income: any) {
    this.strapiService.updateIncome(income.id, income).subscribe(
      () => {
        console.log('Updated income:', income);
        this.fetchIncome(); // Refresh the list of income
      },
      (error: HttpErrorResponse) => {
        console.error('Error updating income:', error);
      }
    );
  }
}
