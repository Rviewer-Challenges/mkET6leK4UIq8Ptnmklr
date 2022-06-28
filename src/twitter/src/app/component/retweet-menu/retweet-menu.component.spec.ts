import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetweetMenuComponent } from './retweet-menu.component';

describe('RetweetMenuComponent', () => {
  let component: RetweetMenuComponent;
  let fixture: ComponentFixture<RetweetMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetweetMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetweetMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
