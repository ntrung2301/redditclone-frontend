import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePostTileComponent } from './profile-post-tile.component';

describe('ProfilePostTileComponent', () => {
  let component: ProfilePostTileComponent;
  let fixture: ComponentFixture<ProfilePostTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePostTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePostTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
