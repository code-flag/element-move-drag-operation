import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragOperationComponent } from './drag-operation.component';

describe('DragOperationComponent', () => {
  let component: DragOperationComponent;
  let fixture: ComponentFixture<DragOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragOperationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
