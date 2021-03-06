import { Component, OnInit, Inject, ViewChild, Pipe, PipeTransform, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Contact, ContactGroup } from "../../app.component";
import * as _ from 'lodash';
import { MatAccordion } from '@angular/material/expansion';
import { EditContactDialogComponent } from "../edit-contact-dialog/edit-contact-dialog.component";
import { EditGroupDialogComponent } from "../edit-group-dialog/edit-group-dialog.component";

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
  contacts: any[];
  displayPanel: boolean
  searchText: string;
  options;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SelectReceiverComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.options = this.data.options;
    this.groups = _.cloneDeep(this.data.contactGroups);
    this.contacts = _.cloneDeep(this.data.contacts);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.displayPanel = true; // 解决 expansion panel 在打开弹窗时会闪一下的问题
    }, 20)
  }

  checkGroupsSelected(person) {
    this.groups.forEach(group => {
      group.members.forEach(member => {
        if (person[this.options.primaryKey] === member[this.options.primaryKey]) {
          member.selected = person.selected;
        }
      });
      group.selected = group.members.every(person => {
        return person.selected;
      })
    })
  }

  checkContactsSelected(persons) {
    this.contacts.forEach((item) => {
      persons.forEach(person => {
        if (person[this.options.primaryKey] === item[this.options.primaryKey]) {
          item.selected = person.selected;
        }
      })
    })
  }

  changePerson(person, selected) {
    person.selected = selected;
    this.checkGroupsSelected(person);
  }

  changeGroupPerson(person, group, selected) {
    person.selected = selected;
    this.checkContactsSelected([person]);
    this.checkGroupsSelected(person);
    group.selected = group.members.every(person => {
      return person.selected;
    })
  }

  changeGroup(e, group, selected) {
    window.event ? window.event.cancelBubble = true : e.stopPropagation();
    group.selected = selected;
    group.members.forEach(person => {
      person.selected = selected;
    })
    this.checkContactsSelected(group.members);
    group.members.forEach(person => {
      this.checkGroupsSelected(person);
    })
  }

  search() {
    this.accordion.openAll();
  }

  clearSearch() {
    this.searchText = '';
  }

  getContacts() {
    const searchText = this.searchText ? this.searchText.toLowerCase() : '';
    return this.contacts.filter(item => {
      return item[this.options.display].toLowerCase().indexOf(searchText) != - 1
        || item[this.options.valueKey].toLowerCase().indexOf(searchText) != - 1
    });
  }

  getGroups() {
    const searchText = this.searchText ? this.searchText.toLowerCase() : '';
    const newGroups = [];
    this.groups.forEach(item => {
      if (item['members'].filter(member => {
        return member[this.options.display].toLowerCase().indexOf(searchText) != - 1
          || member[this.options.valueKey].toLowerCase().indexOf(searchText) != - 1
      }).length || item['groupName'].toLowerCase().indexOf(searchText) != - 1) {
        newGroups.push(item);
      }
    })
    return newGroups;
  }

  editContact(person?) {
    const dialogRef = this.dialog.open(EditContactDialogComponent, {
      data: {
        contact: person ? person : null,
        contacts: this.contacts,
        groups: this.groups,
        options: this.options
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.primaryKey !== null) {
          person[this.options.display] = result.name;
          person[this.options.valueKey] = result.value;
        } else {
          const newPerson = {}
          newPerson[this.options.primaryKey] = new Date().getTime();
          newPerson[this.options.display] = result.name;
          newPerson[this.options.valueKey] = result.value;
          this.contacts.push(newPerson);
        }
      }
    });
  }

  editGroup(e, group?, index?) {
    let selectedGroup;
    if (group) {
      selectedGroup = _.cloneDeep(group);
      selectedGroup.index = index;
    }
    window.event ? window.event.cancelBubble = true : e.stopPropagation();
    const dialogRef = this.dialog.open(EditGroupDialogComponent, {
      data: {
        group: group ? selectedGroup : null,
        contacts: this.contacts,
        groups: this.groups,
        options: this.options
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (group) { // Edit Group
          group = result;
          _.fill(this.groups, result, index, index + 1);
        } else { // Create Group
          this.groups.push(result);
        }
      }
    });
  }

  selectionDone() {
    const selectedContacts = this.contacts.filter(item => {
      return item.selected;
    });
    this.dialogRef.close(selectedContacts);
  }
}
