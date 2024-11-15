import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardTesterComponent } from './keyboard-tester.component';

describe('KeyboardTesterComponent', () => {
  let component: KeyboardTesterComponent;
  let fixture: ComponentFixture<KeyboardTesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyboardTesterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyboardTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
