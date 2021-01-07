import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Contact, ContactGroup} from "../../app.component";
import * as _ from 'lodash';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-select-receiver',
  templateUrl: './select-receiver.component.html',
  styleUrls: ['./select-receiver.component.scss']
})
export class SelectReceiverComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  receivers;
  selectedReceivers;
  groups: ContactGroup[];
  contacts: Contact[];
  displayPanel: boolean
  searchText: string;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SelectReceiverComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    console.log(this.data);
    this.groups = _.cloneDeep(this.data.contactGroups);
    this.contacts = _.cloneDeep(this.data.contacts);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.displayPanel = true; // 解决 expansion panel 在打开弹窗时会闪一下的问题
    }, 20)
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

  search() {
    console.log(this.searchText)
    this.accordion.openAll()
    this.groups = [];
    this.data.contactGroups.forEach(group => {
      console.log(group['members']);
      const members = group['members'].filter(item => {
        return item['email'].indexOf(this.searchText) >= 0;
      });
      console.log(members);
      group['members'] = members;
      this.groups.push(group);
    });
    console.log(this.groups);
    this.contacts = this.data.contacts.filter(item => {
      return item['email'].indexOf(this.searchText) >= 0;
    });
  }

  clearSearch() {
    this.accordion.closeAll();
    this.searchText = '';
    this.search();
  }

}
