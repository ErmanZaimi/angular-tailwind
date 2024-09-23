import { Component, Output, EventEmitter } from '@angular/core';

type ContractField = 'name' | 'email' | 'contractType' | 'phoneNumber' | 'description' | 'date' | 'expirationDate';

@Component({
  selector: 'app-add-contract-modal',
  templateUrl: './add-contract-modal.component.html',
  styleUrls: ['./add-contract-modal.component.scss']
})
export class AddContractModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<{ name: string; email: string; contractType: string; phoneNumber: string; description: string; date: string; expirationDate: string }>();

  name: string = '';
  email: string = '';
  contractType: string = '';
  phoneNumber: string = '';
  description: string = '';
  date: string = '';
  expirationDate: string = '';

  // Track if fields have been touched
  touched: Record<ContractField, boolean> = {
    name: false,
    email: false,
    contractType: false,
    phoneNumber: false,
    description: false,
    date: false,
    expirationDate: false,
  };

  onInputChange(field: ContractField) {
    this.touched[field] = true;
  }

  submit() {
    // Validate required fields
    if (!this.name || !this.email || !this.contractType || !this.phoneNumber || !this.date || !this.expirationDate) {
      alert('Please fill in all required fields.');
      return; // Prevent submission
    }

    const newContract = {
      name: this.name,
      email: this.email,
      contractType: this.contractType,
      phoneNumber: this.phoneNumber,
      description: this.description,
      date: this.date,
      expirationDate: this.expirationDate
    };

    this.add.emit(newContract); // Emit the contract
    this.close.emit(); // Close the modal
  }

  isFieldRequired(field: ContractField): boolean {
    return this.touched[field] && !this[field];
  }
}

