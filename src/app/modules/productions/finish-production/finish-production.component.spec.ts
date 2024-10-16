import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishProductionComponent } from './finish-production.component';

describe('FinishProductionComponent', () => {
  let component: FinishProductionComponent;
  let fixture: ComponentFixture<FinishProductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishProductionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinishProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
