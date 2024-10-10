import { Component, Input, Output, EventEmitter, SimpleChanges, OnInit } from '@angular/core';

interface TableColumn {
  header: string;
  field: string;
  editable?: boolean;
  sortable?: boolean;
}

@Component({
  selector: 'app-reusable-table',
  templateUrl: './reusable-table.component.html',
  styleUrls: ['./reusable-table.component.scss']
})
export class ReusableTableComponent implements OnInit {
  @Input() isLoading: boolean = false;
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() currentPage: number = 1; // Added to take current page from parent
  @Input() itemsPerPage: number = 5; // Added to take items per page from parent
  @Input() totalItems: number = 0;
  @Output() update = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<{ field: string; order: 'asc' | 'desc' }>();
  @Output() messageEvent = new EventEmitter<{ msg: string; type: 'success' | 'error' | null }>();

  editCell: { rowIndex: number, columnField: string } | null = null;
  tempValue: string = '';
  validity: { [key: string]: boolean } = {};
  paginatedData: any[] = [];

  sortField: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';
  searchTerm: string = '';
  message: string = '';
  messageType: 'success' | 'error' | null = null;


  ngOnInit() {
    this.updatePagination();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] || changes['currentPage'] || changes['itemsPerPage']) {
      console.log('Data changed:', this.data);
      console.log('Current page:', this.currentPage);
      console.log('Items per page:', this.itemsPerPage);
      console.log('Total items:', this.totalItems);
      this.updatePagination();
    }
  }
  
  get totalPages(): number {
    return Math.ceil(this.totalItems/ this.itemsPerPage);
  }

  updatePagination() {
    this.paginatedData = this.data.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }
  goToPage(page: number) {
    if (page !== this.currentPage) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage); // Emit the new page to the parent
      console.log(`Changed to page: ${this.currentPage}`);
    }
  }
  startEdit(rowIndex: number, columnField: string, value: string) {
    if (this.columns.find(column => column.field === columnField)?.editable) {
      this.editCell = { rowIndex, columnField };
      this.tempValue = value;
    }
  }
  saveEdit() {
    if (this.editCell) {
      const { rowIndex, columnField } = this.editCell;
      if (!this.tempValue.trim()) {
        this.validity[columnField] = false; // Set invalid for this field
        return; // Do not proceed with saving
      }

      this.validity[columnField] = true; // Set valid for this field
      this.data[rowIndex][columnField] = this.tempValue; // Update the data array
      this.editCell = null; // Exit edit mode

      this.onUpdate(this.data[rowIndex]);  // Emit update event
    }
  }

  onUpdate(item: any) {
    this.update.emit(item);
  }

  onDelete(item: any) {
    this.delete.emit(item);
  }

  sortData(field: string) {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortOrder = 'asc';
    }

    this.data.sort((a, b) => {
      if (a[field] < b[field]) return this.sortOrder === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return this.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    this.updatePagination(); // Update pagination after sorting
    this.sortChange.emit({ field: this.sortField, order: this.sortOrder });
  }
  setMessage(msg: string, type: 'success' | 'error') {
    this.messageEvent.emit({ msg, type });
    setTimeout(() => {
      this.messageEvent.emit({ msg: '', type: null }); // Clear message
    }, 3000);
  }  
}

