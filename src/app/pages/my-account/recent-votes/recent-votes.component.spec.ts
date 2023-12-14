import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentVotesComponent } from './recent-votes.component';

describe('RecentVotesComponent', () => {
  let component: RecentVotesComponent;
  let fixture: ComponentFixture<RecentVotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentVotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecentVotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
