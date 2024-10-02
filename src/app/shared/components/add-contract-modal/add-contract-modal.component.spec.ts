import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContractModalComponent } from './add-contract-modal.component';

describe('AddContractModalComponent', () => {
  let component: AddContractModalComponent;
  let fixture: ComponentFixture<AddContractModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddContractModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddContractModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
