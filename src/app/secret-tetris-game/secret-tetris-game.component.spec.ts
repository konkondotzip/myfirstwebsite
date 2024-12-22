import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretTetrisGameComponent } from './secret-tetris-game.component';

describe('SecretTetrisGameComponent', () => {
  let component: SecretTetrisGameComponent;
  let fixture: ComponentFixture<SecretTetrisGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecretTetrisGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecretTetrisGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
