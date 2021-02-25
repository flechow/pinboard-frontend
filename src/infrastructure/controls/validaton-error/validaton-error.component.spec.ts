import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatonErrorComponent } from './validaton-error.component';

describe('ValidatonErrorComponent', () => {
  let component: ValidatonErrorComponent;
  let fixture: ComponentFixture<ValidatonErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidatonErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatonErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
