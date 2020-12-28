import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupDialogComponent } from "./create-group-dialog/create-group-dialog.component";
import { SelectReceiverComponent } from "./select-receiver/select-receiver.component";
import { Contact, ContactGroup } from "../app.component";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @Input()
  set contacts(contacts: { email: string }[]) {
    console.log(contacts);
    this._contacts = contacts;
  }

  get contacts(): { email: string }[] {
    return this._contacts;
  }

  @Input()
  set contactGroups(contactGroups: ContactGroup[]) {
    console.log(contactGroups);
    this._contactGroups = contactGroups;
  }

  get contactGroups(): ContactGroup[] {
    return this._contactGroups;
  }

  _contacts: { email: string }[];
  _contactGroups: ContactGroup[];

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  onChange(value) {
    console.log(value);
  }

  showReceiver(receiver) {
    console.log(receiver);
  }

  createGroup() {
    const dialogRef = this.dialog.open(CreateGroupDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  selectReceiver() {
    const dialogRef = this.dialog.open(SelectReceiverComponent, {
      data: {
        contacts: this._contacts,
        contactGroups: this._contactGroups
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
