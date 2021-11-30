import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociacionConductorComponent } from './asociacion-conductor.component';

describe('AsociacionConductorComponent', () => {
  let component: AsociacionConductorComponent;
  let fixture: ComponentFixture<AsociacionConductorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsociacionConductorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsociacionConductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
