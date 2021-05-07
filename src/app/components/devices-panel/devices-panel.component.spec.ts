import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesPanelComponent } from './stations-panel.component';

describe('evicesPanelComponent', () => {
  let component: evicesPanelComponent;
  let fixture: ComponentFixture<evicesPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevicesPanelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
