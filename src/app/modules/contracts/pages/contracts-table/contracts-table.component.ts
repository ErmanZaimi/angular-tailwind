import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReusableTableModule } from '../reusable-table/reusable-table.module';
import { StrapiService } from '..//..//..//../core/services/strapi.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AddContractModalModule } from '../../../../shared/components/add-contract-modal/add-contract-modal.module'; // Correct import

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
  imports: [CommonModule, FormsModule, ReusableTableModule, AddContractModalModule],
  templateUrl: './contracts-table.component.html',
  styleUrls: ['./contracts-table.component.scss']
})
export class ContractsTableComponent {
 
  isModalOpen: boolean = false;

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
  message: string = '';
  messageType: 'success' | 'error' | null = null;
  isLoading: boolean = false;

  constructor(private strapiService: StrapiService) { }

  ngOnInit(): void {
    this.fetchData();
  }
 
  fetchData() {
    this.isLoading = true;
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
      error => console.error('Error fetching contracts:', error),
      () => {
        this.isLoading = false; // Stop loading
      }
    );
  }


 filterData() {
    this.currentPage = 1; // Reset to the first page when filtering
    console.log('Search term:', this.searchTerm);
    this.fetchData(); // Re-fetch contracts based on the search term
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage; // Update the current page
    console.log(`Current page set to: ${this.currentPage}`);
    this.fetchData(); // Fetch contracts for the new page
  }

  onSortChange(sort: { field: string; order: 'asc' | 'desc' }) {
    this.sortField = sort.field;
    this.sortOrder = sort.order;
    this.fetchData(); // Re-fetch contracts with new sorting
  }

  handleUpdate(item: Contract) {
    this.isLoading = true;
    this.strapiService.updateContract(item.id, item).subscribe(
      () => {
        console.log('Updated contract:', item);
        // Optionally, you can refresh your filtered data here
        this.fetchData();
      },
      (error: HttpErrorResponse) => {
        console.error('Error updating contract:', error);
      },
      () => {
        this.isLoading = false; // Stop loading
      }
    );
  }
  
  handleDelete(item: Contract) {
    this.isLoading = true;
    this.strapiService.deleteContract(item.id).subscribe(
      () => {
        console.log('Deleted contract:', item);
        this.filteredData = this.filteredData.filter(contract => contract.id !== item.id);
        this.onMessageReceived({ msg: 'Contract deleted successfully!', type: 'success' });
      },
      (error: HttpErrorResponse) => {
        console.error('Error deleting contract:', error);
        this.onMessageReceived({ msg: 'Error deleting contract. Please try again.', type: 'error' });
      },
      () => {
        this.isLoading = false; // Stop loading
      }
    );
  }
  openAddContractModal() {
    this.isModalOpen = true;
  }
  
  closeAddContractModal() {
    this.isModalOpen = false;
  }
  
  addContract(newContract: { name: string; email: string; contractType: string; phoneNumber: string; description: string; date: string; expirationDate: string }) {
    this.isLoading = true;
    this.strapiService.createContract(newContract).subscribe(
      (response) => {
        console.log('Contract added:', response);
        this.fetchData(); // Refresh the table
        this.closeAddContractModal(); // Close the modal after adding
        this.onMessageReceived({ msg: 'Contract added successfully!', type: 'success' });
      },
      (error) => {
        console.error('Error adding contract:', error);
        alert('Failed to add contract. Please try again.'); // Optional: notify user of the error
        this.onMessageReceived({ msg: 'Failed to add contract. Please try again.', type: 'error' });
      },
      () => {
        this.isLoading = false; // Stop loading
      }
    );
  }
  onMessageReceived(event: { msg: string; type: 'success' | 'error' | null }) {
    this.message = event.msg;
    this.messageType = event.type; // This should be allowed to be null
    setTimeout(() => {
      this.message = '';
      this.messageType = null; // Clearing the message
    }, 3000);
  }
  
  
  }
  


