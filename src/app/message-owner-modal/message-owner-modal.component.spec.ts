import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageOwnerModalComponent } from './message-owner-modal.component';

describe('MessageOwnerModalComponent', () => {
  let component: MessageOwnerModalComponent;
  let fixture: ComponentFixture<MessageOwnerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageOwnerModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageOwnerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
