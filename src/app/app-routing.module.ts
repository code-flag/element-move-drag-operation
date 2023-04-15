import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoveOperationComponent } from './move-operation/move-operation.component';
import { DragOperationComponent } from './drag-operation/drag-operation.component';


const routes: Routes = [
  { path: 'keyevent-operation', component: MoveOperationComponent },
  { path: "drag-operation", component: DragOperationComponent },
  { path: "", component: MoveOperationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
