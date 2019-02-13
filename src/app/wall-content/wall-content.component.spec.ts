import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WallContentComponent } from './wall-content.component';

describe('WallContentComponent', () => {
  let component: WallContentComponent;
  let fixture: ComponentFixture<WallContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WallContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WallContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
