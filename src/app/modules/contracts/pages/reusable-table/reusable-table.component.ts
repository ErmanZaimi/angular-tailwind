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
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Output() update = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  editCell: { rowIndex: number, columnField: string } | null = null;
  tempValue: string = '';

  // Pagination variables
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  paginatedData: any[] = [];

  sortField: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';

  ngOnInit() {
    this.updatePagination();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.updatePagination();
    }
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.data.length / this.itemsPerPage);
    this.paginatedData = this.data.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  startEdit(rowIndex: number, columnField: string, value: string) {
    if (this.columns.find(column => column.field === columnField)?.editable) {
      this.editCell = { rowIndex, columnField };
      this.tempValue = value;
    }
  }

  cancelEdit() {
    this.editCell = null;
  }

  saveEdit() {
    if (this.editCell) {
      const { rowIndex, columnField } = this.editCell;
      this.data[rowIndex][columnField] = this.tempValue;
      this.editCell = null;
      this.update.emit(this.data[rowIndex]);  // Emit update event
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
  }
}

