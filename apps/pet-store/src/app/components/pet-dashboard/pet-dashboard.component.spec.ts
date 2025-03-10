import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetDashboardComponent } from './pet-dashboard.component';

describe('PetDashboardComponent', () => {
  let component: PetDashboardComponent;
  let fixture: ComponentFixture<PetDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
