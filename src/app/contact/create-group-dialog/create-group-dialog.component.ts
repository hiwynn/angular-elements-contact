import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-group-dialog',
  templateUrl: './create-group-dialog.component.html',
  styleUrls: ['./create-group-dialog.component.scss']
})
export class CreateGroupDialogComponent implements OnInit {
  groupName: string;
  groupPersons: { name: string; email: string; }[];

  constructor() {
  }

  ngOnInit(): void {
    this.groupPersons = [
      {name: null, email: null},
      {name: null, email: null},
      {name: null, email: null},
      {name: null, email: null},
      {name: null, email: null}
    ]
  }

  addNewLine() {
    this.groupPersons.push({name: null, email: null});
  }

  saveGroup() {
    const persons = this.groupPersons.filter(item => item.name || item.email);
    console.log(persons);
  }
}
