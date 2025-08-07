import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockUtils } from './stock-utils';

describe('StockUtils', () => {
  let component: StockUtils;
  let fixture: ComponentFixture<StockUtils>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockUtils]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockUtils);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
