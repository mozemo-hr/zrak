import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZagadjenostComponent } from './zagadjenost.component';

describe('ZagadjenostComponent', () => {
  let component: ZagadjenostComponent;
  let fixture: ComponentFixture<ZagadjenostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZagadjenostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZagadjenostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
