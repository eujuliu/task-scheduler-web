import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Button } from './button';

describe('Button', () => {
  let component: Button;
  let fixture: ComponentFixture<Button>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button],
    }).compileComponents();

    fixture = TestBed.createComponent(Button);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have icon', () => {
    let icon = fixture.nativeElement.querySelector('ion-icon');
    expect(icon).toBeNull();
    component.icon = 'heart';

    fixture.detectChanges();

    icon = fixture.nativeElement.querySelector('ion-icon');
    expect(icon).toBeTruthy();
  });

  it('should have text', () => {
    expect(fixture.nativeElement.textContent).toBe('');
    component.text = 'Text';

    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toBe(component.text);
  });
});
