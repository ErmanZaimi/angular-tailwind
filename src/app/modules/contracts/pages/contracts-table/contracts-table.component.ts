import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReusableTableModule } from '../reusable-table/reusable-table.module';
@Component({
  selector: 'app-contracts-table',
  standalone: true,
  imports: [CommonModule,FormsModule,  ReusableTableModule ],
  templateUrl: './contracts-table.component.html',
  styleUrl: './contracts-table.component.scss'
})
export class ContractsTableComponent {
  columns = [
    { header: 'Contract ID', field: 'id', editable: false,sortable: true },
    { header: 'Name', field: 'name', editable: true, sortable: true },
    { header: 'Email', field: 'email', editable: true, sortable: true },
    { header: 'Date', field: 'date', editable: true, sortable: true },
    { header: 'Type of Contract', field: 'contractType', editable: true, sortable: true },
    { header: 'Phone Number', field: 'phoneNumber', editable: true, sortable: true },
    { header: 'Expiration Date', field: 'expirationDate', editable: true, sortable: true },
    { header: 'Actions', field: 'actions', editable: false } 
  ];

  data = [
    { 
      id: 1, 
      name: 'Contract A', 
      email: 'contractA@example.com',
      date: '2024-09-10', 
      contractType: 'Type 1', 
      phoneNumber: '123-456-7890', 
      expirationDate: '2025-09-10' 
    },
    { 
      id: 2, 
      name: 'Contract B', 
      email: 'contractB@example.com',
      date: '2024-09-11', 
      contractType: 'Type 2', 
      phoneNumber: '098-765-4321', 
      expirationDate: '2025-09-11' 
    },
    { 
      id: 3, 
      name: 'Contract C', 
      email: 'contractC@example.com',
      date: '2024-09-12', 
      contractType: 'Type 3', 
      phoneNumber: '234-567-8901', 
      expirationDate: '2025-09-12' 
    },
    { 
      id: 4, 
      name: 'Contract D', 
      email: 'contractD@example.com',
      date: '2024-09-13', 
      contractType: 'Type 4', 
      phoneNumber: '345-678-9012', 
      expirationDate: '2025-09-13' 
    },
    { 
      id: 5, 
      name: 'Contract E', 
      email: 'contractE@example.com',
      date: '2024-09-14', 
      contractType: 'Type 5', 
      phoneNumber: '456-789-0123', 
      expirationDate: '2025-09-14' 
    },
    { 
      id: 6, 
      name: 'Contract F', 
      email: 'contractE@example.com',
      date: '2024-09-14', 
      contractType: 'Type 5', 
      phoneNumber: '456-789-0123', 
      expirationDate: '2025-09-14' 
    },
    { 
      id: 7, 
      name: 'Contract G', 
      email: 'contractE@example.com',
      date: '2024-09-14', 
      contractType: 'Type 5', 
      phoneNumber: '456-789-0123', 
      expirationDate: '2025-09-14' 
    },
    { 
      id: 8, 
      name: 'Contract H', 
      email: 'contractE@example.com',
      date: '2024-09-14', 
      contractType: 'Type 5', 
      phoneNumber: '456-789-0123', 
      expirationDate: '2025-09-14' 
    },
    { 
      id: 9, 
      name: 'Contract I', 
      email: 'contractE@example.com',
      date: '2024-09-14', 
      contractType: 'Type 5', 
      phoneNumber: '456-789-0123', 
      expirationDate: '2025-09-14' 
    },
    { 
      id: 10, 
      name: 'Contract J', 
      email: 'contractE@example.com',
      date: '2024-09-14', 
      contractType: 'Type 5', 
      phoneNumber: '456-789-0123', 
      expirationDate: '2025-09-14' 
    }
  ];

  filteredData = [...this.data]; // Initialize filtered data

  searchTerm: string = '';
  contracts: any;
  filterData() {
    console.log('Filtering data with search term:', this.searchTerm); // Debugging log
    if (!this.searchTerm) {
      this.filteredData = [...this.data];
      return;
    }
    this.filteredData = this.data.filter(item =>
      Object.values(item).some(value =>
        value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
    console.log('Filtered data:', this.filteredData); // Debugging log
  }

  handleUpdate(item: any) {
    console.log('Update', item);
    // Handle the update logic here
  }

  handleDelete(item: any) {
    console.log('Deleted contract:', item);
    this.filteredData = this.filteredData.filter(contract => contract.id !== item.id);
  }
  
}
