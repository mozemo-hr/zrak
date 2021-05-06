import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationsPanelComponent } from './stations-panel.component';

describe('StationsPanelComponent', () => {
  let component: StationsPanelComponent;
  let fixture: ComponentFixture<StationsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StationsPanelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StationsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
