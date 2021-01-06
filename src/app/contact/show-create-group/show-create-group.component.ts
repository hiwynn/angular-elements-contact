import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CreateGroupDialogComponent } from "../create-group-dialog/create-group-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-show-create-group',
  templateUrl: './show-create-group.component.html',
  styleUrls: ['./show-create-group.component.css']
})
export class ShowCreateGroupComponent implements OnInit {

  @Output() closed = new EventEmitter();

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.createGroup();
  }

  createGroup() {
    const dialogRef = this.dialog.open(CreateGroupDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.closed.next();
    });
  }

}
