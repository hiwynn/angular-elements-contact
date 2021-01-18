import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import * as _ from 'lodash';
import { AlertDialogComponent } from "../alert-dialog/alert-dialog.component";

let PRIMARY_KEY: string;

@Component({
  selector: 'app-edit-group-dialog',
  templateUrl: './edit-group-dialog.component.html',
  styleUrls: ['./edit-group-dialog.component.scss']
})
export class EditGroupDialogComponent implements OnInit {

  options;
  currentGroup;
  searchText: string;
  contacts: any[];
  originMembers: any[];

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<EditGroupDialogComponent>,) {
  }

  ngOnInit(): void {
    PRIMARY_KEY = this.data.options.primaryKey
    this.options = this.data.options;
    this.contacts = _.cloneDeep(this.data.contacts);
    this.currentGroup = this.data.group ? _.cloneDeep(this.data.group) : {
      groupName: '',
      members: []
    };
    this.originMembers = _.cloneDeep(this.currentGroup.members);
    this.checkContactList(this.currentGroup.members);
  }

  checkContactList(groupMembers) {
    groupMembers.forEach(member => {
      this.contacts.forEach(person => {
        if (member[PRIMARY_KEY] === person[PRIMARY_KEY]) {
          person.exist = true;
        }
      })
    })
  }

  trackByFn(index, item) {
    return item[PRIMARY_KEY];
  }

  removeFromGroup(person) {
    person.exist = false;
    this.changePersonInList(person);
    const personInList = this.contacts.find(item => {
      return item[PRIMARY_KEY] === person[PRIMARY_KEY]
    })
    if (personInList) {
      personInList.exist = false;
    }
  }

  changePersonInList(person) {
    if (person.exist) {
      const member = _.cloneDeep(person);
      delete member.exist;
      this.currentGroup.members.push(person);
      this.originMembers.push(person);
    } else {
      _.remove(this.currentGroup.members, member => {
        return member[PRIMARY_KEY] === person[PRIMARY_KEY];
      })
      _.remove(this.originMembers, member => {
        return member[PRIMARY_KEY] === person[PRIMARY_KEY];
      })
    }
  }

  searchChange(searchText) {
    searchText = searchText ? searchText.toLowerCase() : '';
    this.currentGroup.members = this.originMembers.filter(item => {
      return item[this.options.display].toLowerCase().indexOf(searchText) != - 1
        || item[this.options.valueKey].toLowerCase().indexOf(searchText) != - 1
    });
  }

  clearSearch() {
    this.searchText = '';
    this.searchChange('');
  }

  delete() {
    console.log(this.currentGroup);
    this.dialog.open(AlertDialogComponent, {
      data: {
        'title': '删除联系人组',
        'description': '你确定删除此联系人组吗？'
      }
    }).afterClosed().subscribe(result => {
     console.log(result);
    })
  }

  done() {
    this.dialogRef.close(this.currentGroup);
  }

}
