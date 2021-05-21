// Drag & drop interfaces
//interfaces are not compile to anything, there is no js equivalent for an interface

//adding export means these interfaces are now available outside of this file as well
export interface Draggable {
    //two handlers
    //listen to start of the drag event
    dragStartHandler(event: DragEvent): void;  
    
    //lesten to the end of the drag event
    dragEndHandler(event: DragEvent): void;    
}

export interface DragTarget {
    //to signal the browder and javascript that the thing we're dragging something is valid drag target 
    dragOverHandler(event: DragEvent): void;
    //handle the drop and update UI or data 
    dropHandler(event: DragEvent): void;
    //to revert visual update
    dragLeaveHandler(event: DragEvent): void;
}