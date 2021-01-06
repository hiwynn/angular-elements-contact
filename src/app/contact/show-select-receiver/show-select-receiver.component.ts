import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SelectReceiverComponent } from "../select-receiver/select-receiver.component";
import { MatDialog } from "@angular/material/dialog";
import { AppComponent } from "../../app.component";

@Component({
  selector: 'app-show-select-receiver',
  templateUrl: './show-select-receiver.component.html',
  styleUrls: ['./show-select-receiver.component.css']
})
export class ShowSelectReceiverComponent implements OnInit {

  @Output() closed = new EventEmitter();

  constructor(public dialog: MatDialog, private appComponent: AppComponent) {
  }

  ngOnInit(): void {
    this.selectReceiver();
  }

  selectReceiver() {
    const dialogRef = this.dialog.open(SelectReceiverComponent, {
      data: {
        contacts: this.appComponent.contacts,
        contactGroups: this.appComponent.contactGroups
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.closed.next();
    });
  }

}
