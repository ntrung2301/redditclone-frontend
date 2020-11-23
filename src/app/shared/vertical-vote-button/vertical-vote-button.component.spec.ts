import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalVoteButtonComponent } from './vertical-vote-button.component';

describe('VerticalVoteButtonComponent', () => {
  let component: VerticalVoteButtonComponent;
  let fixture: ComponentFixture<VerticalVoteButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerticalVoteButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalVoteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
