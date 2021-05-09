import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LebdeceCesticeComponent } from './lebdece-cestice.component';

describe('LebdeceCesticeComponent', () => {
  let component: LebdeceCesticeComponent;
  let fixture: ComponentFixture<LebdeceCesticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LebdeceCesticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LebdeceCesticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
