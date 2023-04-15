import { Component, OnInit, HostListener, ElementRef, Renderer2, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-move-operation',
  templateUrl: './move-operation.component.html',
  styleUrls: ['./move-operation.component.scss']
})


export class MoveOperationComponent implements OnInit {

  constructor(private element: ElementRef,
    private renderer: Renderer2,
    private changeDetection: ChangeDetectorRef,
    private router: Router
    ) { }


  public KEY_CODE = {
    UP_ARROW: 38,
    DOWN_ARROW: 40,
    RIGHT_ARROW: 39,
    LEFT_ARROW: 37
  }

  @ViewChild('block1') block1!: ElementRef;
  @ViewChild('block2') block2!: ElementRef;
  @ViewChild('block3') block3!: ElementRef;
  @ViewChild('modal') modal!: ElementRef;
  // dblclick 
  // mousedown 


  ngOnInit() {
    setTimeout(() => {
      this.renderer.addClass(this.block1.nativeElement, "block-border-color");
      this.itemIndex = 1;
      this.blockNumber = 0;
    }, 500);
  }

  title = 'moveOperation';
  
  
  d1: Array<any> = ['Love all, trust a few, do wrong to none',
  'You call it madness, but I call it love',
  'We can only learn to love by loving',
  'A life lived in love will never be dull',
  'Life is the flower for which love is the honey',
  'All you need is love',
  'True love stories never have endings'];
  d2: Array<any> = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  d3: Array<any> = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  

  blockData: any = this.convertDataArrayToArrayOfObject([this.d1, this.d2, this.d3]);
  backLog = this.blockData[0];
  inProgress = this.blockData[1];
  done = this.blockData[2];


  doubleClick: number = 0;

  blockNumber: any;
  itemIndex = 0;

  stateManager = {
    totalBlock: 3,
    currentBlockNumber: 0,
    currentItem: this.itemIndex,
  }

  // key definition and directions
  moveFocusUpKey: string = 'j';
  moveFocusDownKey: string = 'k'
  moveFocusLeftKey: string = 'h';
  moveFocusRightKey: string = 'l';

  moveItemUpKey: string = 'J';
  moveItemDownKey: string = 'K'
  moveItemLeftKey: string = 'H';
  moveItemRightKey: string = 'L';

  
   keyGDoubleCLick() {
       this.itemIndex = 1;
   }



  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {

    if (event.shiftKey && event.key === 'Tab') {
      event.preventDefault();
      this.changeFocus("left");
    }
    else if (event.key == "Tab") {
      event.preventDefault();
      this.changeFocus("right");
    }
    else if (event.shiftKey && event.key) {
      this.getMoveItemKeyEvent(event.key);
    }
    else {
      this.doubleClick++;
      
      this.getFocusKeyEvent(event.key);
      
      setTimeout(() => {
        if (this.doubleClick > 1 && event.key == 'g') {
          this.keyGDoubleCLick();
          this.doubleClick = 0;
        }
      }, 200);
    }
  }

 

  /**
   * Helps us to convert normal array of item to array of item object with id added
   * @param datas - Array of arrays
   * @returns arrays of object
   */
  convertDataArrayToArrayOfObject(datas: Array<any>) {
    let newBlockData: any= [];
    for (let block = 0; block < datas.length; block++) {
      let i = 0;
        newBlockData[block] = datas[block].map((item: any) => {
          i++;
          return {id: i, item: item, blockNumber: block}
           });
    }

    return newBlockData;
  }

  getFocusKeyEvent(key: any) {
    
    console.log("item number", this.itemIndex, "block number", this.blockNumber);

    if (key === this.moveFocusUpKey) {
      if(this.itemIndex > 1) {
        this.itemIndex -= 1;
      }
      
    } 
    else if (key === this.moveFocusDownKey) {
      if (this.itemIndex < this.blockData[this.blockNumber]?.length) {
        this.itemIndex += 1;
      }
    } 
    else if (key === this.moveFocusRightKey) {
      if (this.blockNumber < this.blockData?.length - 1 ) {

        if (this.blockNumber == 0) {
          this.setActiveBlockCSS(this.block1.nativeElement, this.block2.nativeElement);
        }
        else if (this.blockNumber == 1) {
          this.setActiveBlockCSS(this.block2.nativeElement, this.block3.nativeElement);
        }
        else if (this.blockNumber == 2) {
          this.setActiveBlockCSS(this.block2.nativeElement, this.block3.nativeElement);
        }
        this.blockNumber += 1;
        this.itemIndex = 1;        
      }
  
    } 
    else if (key === this.moveFocusLeftKey) {
      if (this.blockNumber > 0 ) {

        if (this.blockNumber == 1) {
          this.setActiveBlockCSS(this.block2.nativeElement, this.block1.nativeElement);
        }
        else if (this.blockNumber == 2) {
          this.setActiveBlockCSS(this.block3.nativeElement, this.block2.nativeElement);
        }

        this.blockNumber -= 1;
        this.itemIndex = 1;
      }
    } 
    

  }

  getMoveItemKeyEvent(key: any) {
    if (key === this.moveItemUpKey) {
      if(this.itemIndex > 1) {
        this.moveItemVerticallyUp(this.blockNumber, this.itemIndex);
      }      
    } 
    else if (key === this.moveItemDownKey) {
      if (this.itemIndex < this.blockData[this.blockNumber]?.length) {
        this.moveItemVerticallyDown(this.blockNumber, this.itemIndex);
      }
    } 
    else if (key === this.moveItemRightKey) {
      if (this.blockNumber < this.blockData?.length - 1 ) {
        this.moveItemHorizontally(this.blockNumber, this.itemIndex, this.blockNumber+1);
        
        if (this.blockNumber == 0) {
          this.setActiveBlockCSS(this.block1.nativeElement, this.block2.nativeElement);
        }
        else if (this.blockNumber == 1) {
          this.setActiveBlockCSS(this.block2.nativeElement, this.block3.nativeElement);
        }
      }
  
    } 
    else if (key === this.moveItemLeftKey) {
      if (this.blockNumber > 0 ) {
        this.moveItemHorizontally(this.blockNumber, this.itemIndex, this.blockNumber-1, "left");
        
         if (this.blockNumber == 1) {
          this.setActiveBlockCSS(this.block2.nativeElement, this.block1.nativeElement);
        }
        else if (this.blockNumber == 2) {
          this.setActiveBlockCSS(this.block3.nativeElement, this.block2.nativeElement);
        }
      }
    } 
    

  }

  getTheCurrentItemPosition(id: any, blockNumber: string) {
    this.itemIndex = id; 
    this.blockNumber = blockNumber;
    console.log("item", this.blockData[blockNumber][id-1]);
  }

  moveItemHorizontally(currentBlockIndex: any, itemIndex:any, nextBlockIndex: any, direction: string = "right"){
    
    let item = this.blockData[currentBlockIndex].splice(itemIndex-1, 1);

    // reset the new block id 
    for (let i = 0; i < this.blockData[currentBlockIndex].length; i++) {
      this.blockData[currentBlockIndex][i].id = i + 1;
    }
  
    // assign the new id and block number to next block details
    item[0].id = this.blockData[nextBlockIndex].length + 1;
    item[0].blockNumber = nextBlockIndex;
     
    this.blockData[nextBlockIndex].push(item[0]);

    if (currentBlockIndex == 0 && direction == "right") {
      this.setActiveBlockCSS(this.block1.nativeElement, this.block2.nativeElement);
    }
    else if (currentBlockIndex == 1 && direction == "right") {
      this.setActiveBlockCSS(this.block2.nativeElement, this.block3.nativeElement);
    }
  
    else if (currentBlockIndex == 1 && direction == "left") {
      this.setActiveBlockCSS(this.block2.nativeElement, this.block1.nativeElement);
    }
    else if (currentBlockIndex == 2 && direction == "left") {
      this.setActiveBlockCSS(this.block3.nativeElement, this.block2.nativeElement);
    }
    
    this.itemIndex = this.blockData[nextBlockIndex].length;
    this.blockNumber = nextBlockIndex;
  
  }

  moveItemVerticallyDown(blockIndex: any, itemIndex:any){
    let newArr = [];
    console.log("old array", this.blockData[blockIndex]);
    for (let i = 0; i < this.blockData[blockIndex].length; i++) {

      // move Item in front of the current Item behind it
      if (i === itemIndex - 1) {
        newArr.push(this.blockData[blockIndex][i+1]);
      }
      // move current Item to the front
      else if (i === itemIndex) {
        newArr.push(this.blockData[blockIndex][i-1]);
      }
      else {
        newArr.push(this.blockData[blockIndex][i]);
      }
      
    }

    this.blockData[blockIndex] = [];
    // reset the new array id's 
    for (let i = 0; i < newArr.length; i++) {
      newArr[i].id = i + 1;
      this.blockData[blockIndex].push(newArr[i]);
    }
    this.changeDetection.detectChanges();
    
  }

  moveItemVerticallyUp(blockIndex: any, itemIndex:any){
    let newArr = []
    for (let i = 0; i < this.blockData[blockIndex].length; i++) {

      // move current object to behind the object behind it
      if (i === itemIndex - 2) {
        newArr.push(this.blockData[blockIndex][i+1]);
      }
      // move object behind current object to the current object position
      else if (i === itemIndex - 1) {
        newArr.push(this.blockData[blockIndex][i-1]);
      }
      else {
        newArr.push(this.blockData[blockIndex][i]);
      }
      
    }

    this.blockData[blockIndex] = [];
    // reset the new array id's 
    for (let i = 0; i < newArr.length; i++) {
      newArr[i].id = i + 1;
      this.blockData[blockIndex].push(newArr[i]);
    }
    
    this.changeDetection.detectChanges();

  }

  /** This method will be called when tab key is pressed */
  changeFocus(direction: string) {

    // when tab is click
    if (direction.toLowerCase() === "right") {
      // if block one is active set it to block two
      if (this.stateManager.currentBlockNumber === 0) {
        this.setActiveBlockCSS(this.block1.nativeElement, this.block2.nativeElement);
        this.stateManager.currentBlockNumber = 1;
        this.blockNumber = 1;
        this.itemIndex = 1;
      }
      // if block two is active set it to block three
      else if (this.stateManager.currentBlockNumber === 1) {
        this.setActiveBlockCSS(this.block2.nativeElement, this.block3.nativeElement);
        this.stateManager.currentBlockNumber = 2;
        this.itemIndex = 1;
        this.blockNumber = 2;
        
      }

      // if block three is active set it to block one
      else if (this.stateManager.currentBlockNumber === 2) {
        this.setActiveBlockCSS(this.block3.nativeElement, this.block1.nativeElement);
        this.stateManager.currentBlockNumber = 0;
        this.itemIndex = 1;
        this.blockNumber = 0;
       
      }
      else { }
    } 
    // when shift + tab is click to set focus to the next table
    else {
     // if block one is active set it to block two
      if (this.stateManager.currentBlockNumber === 0) {      
        this.setActiveBlockCSS(this.block1.nativeElement, this.block3.nativeElement);
        this.stateManager.currentBlockNumber = 2;
        this.blockNumber = 2;
        this.itemIndex = 1;
      }
      // if block two is active set it to block three
      else if (this.stateManager.currentBlockNumber === 1) {
        this.setActiveBlockCSS(this.block2.nativeElement, this.block1.nativeElement);
        this.stateManager.currentBlockNumber = 0;
        this.blockNumber = 0;
        this.itemIndex = 1;
      }
      // if block three is active set it to block one
      else if (this.stateManager.currentBlockNumber === 2) {
        this.setActiveBlockCSS(this.block3.nativeElement, this.block2.nativeElement);
        this.stateManager.currentBlockNumber = 1;
        this.blockNumber = 1;
        this.itemIndex = 1;
      }
      else { }
    }


  }

  /** This method will be called together with  changeFocus() method */
  setActiveBlockCSS(prevBlock: ElementRef, newBlock: ElementRef) {
    console.log('prev block', prevBlock, "next block", newBlock);
    
    this.renderer.removeClass(prevBlock, "block-border-color");

    this.renderer.addClass(newBlock, "block-border-color");
  }

  navigate() {
    this.router.navigate(['/drag-operation']);
  }

  newTaskBlockNumber: any = 0;
  newTaskItem: string = '';
  newTaskText(event:any) {
    this.newTaskItem = event.target.value;
  }

  addNewTask() {
    if (this.newTaskBlockNumber == 1) {
      this.blockData[0].push({id: this.blockData[0].length + 1 , item: this.newTaskItem, blockNumber: 0});
    }
    else if (this.newTaskBlockNumber == 2) {
      this.blockData[1].push({id: this.blockData[1].length + 1 , item: this.newTaskItem, blockNumber: 1});
    }
    else if (this.newTaskBlockNumber == 3) {
      this.blockData[3].push({id: this.blockData[2].length + 1 , item: this.newTaskItem, blockNumber: 2});
    }
    this.renderer.removeClass(this.modal.nativeElement, "show");
    this.renderer.addClass(this.modal.nativeElement, "hide");
  }

  showNewTaskModal(blockNumber: any) {
    this.newTaskBlockNumber = blockNumber;
    this.renderer.removeClass(this.modal.nativeElement, "hide");
    this.renderer.addClass(this.modal.nativeElement, "show");
  }
}
