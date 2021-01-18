import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() options;
  @Input() contacts;
  @Input() groups;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.selectReceiver();
  }

  selectReceiver() {
    const dialogRef = this.dialog.open(SelectReceiverComponent, {
      data: {
        options: JSON.parse(this.options),
        contacts: JSON.parse(this.contacts),
        contactGroups: JSON.parse(this.groups)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.closed.next(result);
    });
  }

}
