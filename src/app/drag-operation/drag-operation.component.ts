import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';


@Component({
  selector: 'app-drag-operation',
  templateUrl: './drag-operation.component.html',
  styleUrls: ['./drag-operation.component.scss']
})
export class DragOperationComponent {

  constructor(private router: Router) {

  }

  title = 'moveOperation';
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  inProgress = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];


  drop(event: CdkDragDrop<string[]>) {

    console.log("event ", event);
    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  navigate() {
    this.router.navigate(['/keyevent-operation']);
  }
}
