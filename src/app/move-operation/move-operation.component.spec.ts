import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveOperationComponent } from './move-operation.component';

describe('MoveOperationComponent', () => {
  let component: MoveOperationComponent;
  let fixture: ComponentFixture<MoveOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoveOperationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoveOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
