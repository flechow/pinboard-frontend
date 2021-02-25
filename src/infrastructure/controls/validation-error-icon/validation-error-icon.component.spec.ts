import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationErrorIconComponent } from './validation-error-icon.component';

describe('ValidationErrorIconComponent', () => {
  let component: ValidationErrorIconComponent;
  let fixture: ComponentFixture<ValidationErrorIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationErrorIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationErrorIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
