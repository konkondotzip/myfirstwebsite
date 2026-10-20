import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoxAndStickComponent } from './fox-and-stick.component';

describe('FoxAndStickComponent', () => {
  let component: FoxAndStickComponent;
  let fixture: ComponentFixture<FoxAndStickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoxAndStickComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FoxAndStickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
