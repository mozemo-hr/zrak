import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicijativaComponent } from './inicijativa.component';

describe('InicijativaComponent', () => {
  let component: InicijativaComponent;
  let fixture: ComponentFixture<InicijativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicijativaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicijativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
