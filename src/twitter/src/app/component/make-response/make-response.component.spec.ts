import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeResponseComponent } from './make-response.component';

describe('MakeResponseComponent', () => {
  let component: MakeResponseComponent;
  let fixture: ComponentFixture<MakeResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
