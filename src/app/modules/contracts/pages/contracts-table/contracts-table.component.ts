import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReusableTableModule } from '../reusable-table/reusable-table.module';
import { StrapiService } from '..//..//..//../core/services/strapi.service';
import { HttpErrorResponse } from '@angular/common/http';

interface Contract {
  id: number;
  name: string;
  email: string;
  description: string;
  date: string;
  expirationDate: string;
  phoneNumber: string;
  contractType: string;
}

@Component({
  selector: 'app-contracts-table',
  standalone: true,
  imports: [CommonModule, FormsModule, ReusableTableModule],
  templateUrl: './contracts-table.component.html',
  styleUrls: ['./contracts-table.component.scss']
})
export class ContractsTableComponent {
  columns = [
    { header: 'Contract ID', field: 'id', editable: false, sortable: true },
    { header: 'Name', field: 'name', editable: true, sortable: true },
    { header: 'Email', field: 'email', editable: true, sortable: true },
    { header: 'Date', field: 'date', editable: true, sortable: true },
    { header: 'Type of Contract', field: 'contractType', editable: true, sortable: true },
    { header: 'Phone Number', field: 'phoneNumber', editable: true, sortable: true },
    { header: 'Expiration Date', field: 'expirationDate', editable: true, sortable: true },
    { header: 'Actions', field: 'actions', editable: false }
  ];

  sortField: string = 'id';
  sortOrder: 'asc' | 'desc' = 'asc';

  contracts: Contract[] = []; // Initialize contracts
  filteredData: Contract[] = []; // Initialize as an empty array
  data: Contract[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;

  constructor(private strapiService: StrapiService) { }

  ngOnInit(): void {
    this.fetchContracts();
  }
  get totalPages(): number {
    console.log(this.totalItems);
    return Math.ceil(this.totalItems/ this.itemsPerPage);
  }

  fetchContracts() {
    const sortOptions = this.sortField ? [{ field: this.sortField, order: this.sortOrder }] : []
    console.log(`Fetching contracts for page: ${this.currentPage}, searchTerm: ${this.searchTerm}`);
    this.strapiService.getContracts(this.currentPage, this.itemsPerPage, this.searchTerm, sortOptions).subscribe(
      response => {
        console.log('API Response:', response);
        this.filteredData = response.data.map((item: { id: any; attributes: any; }) => ({
          id: item.id,
          ...item.attributes
        }));
        this.totalItems = response.meta.pagination.total;
        console.log('Total items:', this.totalItems);
      },
      error => console.error('Error fetching contracts:', error)
    );
  }
  filterData() {
    this.currentPage = 1; // Reset to the first page when filtering
    console.log('Search term:', this.searchTerm);
    this.fetchContracts(); // Re-fetch contracts based on the search term
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage; // Update the current page
    console.log(`Current page set to: ${this.currentPage}`);
    this.fetchContracts(); // Fetch contracts for the new page
  }

  onSortChange(sort: { field: string; order: 'asc' | 'desc' }) {
    this.sortField = sort.field;
    this.sortOrder = sort.order;
    this.fetchContracts(); // Re-fetch contracts with new sorting
  }

  handleUpdate(item: Contract) {
    // Assuming you have a way to modify the item (e.g., through an input field)
    this.strapiService.updateContract(item.id, item).subscribe(
      () => {
        console.log('Updated contract:', item);
        // Optionally, you can refresh your filtered data here
        this.fetchContracts();
      },
      (error: HttpErrorResponse) => {
        console.error('Error updating contract:', error);
      }
    );
  }
  
  handleDelete(item: Contract) {
    this.strapiService.deleteContract(item.id).subscribe(
      () => {
        console.log('Deleted contract:', item);
        this.filteredData = this.filteredData.filter(contract => contract.id !== item.id);
      },
      (error: HttpErrorResponse) => {
        console.error('Error deleting contract:', error);
      }
    );
  }
}

