import { Component, OnInit, Inject, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Contact, ContactGroup } from "../../app.component";
import * as _ from 'lodash';
import { MatAccordion } from '@angular/material/expansion';
import { EditContactDialogComponent } from "../edit-contact-dialog/edit-contact-dialog.component";

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
        if (person.id === member.id) {
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
        if (person.id === item.id) {
          item.selected = person.selected;
        }
      })
    })
  }

  addPerson(person) {
    person.selected = true;
    this.checkGroupsSelected(person);
  }

  removePerson(person) {
    person.selected = false;
    this.checkGroupsSelected(person);
  }

  addGroupPerson(person, group) {
    person.selected = true;
    this.checkContactsSelected([person]);
    group.selected = group.members.every(person => {
      return person.selected;
    })
  }

  removeGroupPerson(person, group) {
    person.selected = false;
    this.checkContactsSelected([person]);
    group.selected = group.members.every(person => {
      return person.selected;
    })
  }

  addGroup(e, group) {
    window.event ? window.event.cancelBubble = true : e.stopPropagation();
    group.selected = true;
    group.members.forEach(person => {
      person.selected = true;
    })
    this.checkContactsSelected(group.members);
  }

  removeGroup(e, group) {
    window.event ? window.event.cancelBubble = true : e.stopPropagation();
    group.selected = false;
    group.members.forEach(person => {
      person.selected = false;
    })
    this.checkContactsSelected(group.members);
  }

  search() {
    this.accordion.openAll();
  }

  clearSearch() {
    this.searchText = '';
  }

  createContact() {
    const dialogRef = this.dialog.open(EditContactDialogComponent, {
      data: {
        contact: null,
        contacts: this.contacts
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}

@Pipe({name: 'filterSearch'})
export class FilterSearchPipe implements PipeTransform {
  transform(items: Contact[], field: string, searchText: string): any {
    searchText = searchText ? searchText.toLowerCase() : '';
    return items.filter(item => item[field].toLowerCase().indexOf(searchText) != - 1);
  }
}

@Pipe({name: 'filterGroups'})
export class FilterGroupPipe implements PipeTransform {
  transform(items: ContactGroup[], field: string, searchText: string): any {
    searchText = searchText ? searchText.toLowerCase() : '';
    const newGroups = [];
    items.forEach(item => {
      if (item['members'].filter(member => member[field].toLowerCase().indexOf(searchText) != - 1).length) {
        newGroups.push(item);
      }
    })
    return newGroups;
  }
}
