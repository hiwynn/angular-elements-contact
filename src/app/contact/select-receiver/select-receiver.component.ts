import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Contact, ContactGroup } from "../../app.component";

@Component({
  selector: 'app-select-receiver',
  templateUrl: './select-receiver.component.html',
  styleUrls: ['./select-receiver.component.scss']
})
export class SelectReceiverComponent implements OnInit {

  receivers;
  selectedReceivers;
  groups: ContactGroup[];

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SelectReceiverComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    console.log(this.data);
    this.groups = this.data.contactGroups;
  }

  ngOnInit(): void {
  }

  addPerson(person, group?) {
    console.log(person)
    person.selected = true;
    if (group) {
      group.selected = group.members.every(person => {
        return person.selected;
      })
    }
  }

  removePerson(person, group?) {
    person.selected = false;
    if (group) {
      group.selected = group.members.every(person => {
        return person.selected;
      })
    }
  }

  addGroup(e, group) {
    window.event ? window.event.cancelBubble = true : e.stopPropagation();
    group.selected = true;
    group.members.forEach(person => {
      person.selected = true;
    })
  }

  removeGroup(e, group) {
    window.event ? window.event.cancelBubble = true : e.stopPropagation();
    group.selected = false;
    group.members.forEach(person => {
      person.selected = false;
    })
  }

}
