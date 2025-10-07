import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have icon if type is password', () => {
    let icon = fixture.nativeElement.querySelector('ion-icon');
    expect(icon).toBeNull();
    component.type = 'password';

    fixture.detectChanges();

    icon = fixture.nativeElement.querySelector('ion-icon');
    expect(icon).toBeTruthy();
  });

  it('should have label if label input', () => {
    let label = fixture.nativeElement.querySelector('label');
    expect(label).toBeNull();
    component.label = 'Text';

    fixture.detectChanges();

    label = fixture.nativeElement.querySelector('label');
    expect(label).toBeTruthy();
  });
});
