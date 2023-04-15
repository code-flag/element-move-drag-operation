import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MoveOperationComponent } from './move-operation/move-operation.component';
import { DragOperationComponent } from './drag-operation/drag-operation.component';

@NgModule({
  declarations: [
    AppComponent,
    MoveOperationComponent,
    DragOperationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
