import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertDialogComponent } from "../alert-dialog/alert-dialog.component";
import * as _ from 'lodash';

@Component({
  selector: 'app-edit-contact-dialog',
  templateUrl: './edit-contact-dialog.component.html',
  styleUrls: ['./edit-contact-dialog.component.scss']
})
export class EditContactDialogComponent implements OnInit {

  title: string;
  name: string;
  value: string;
  options;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<EditContactDialogComponent>,
              private _snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.options = this.data.options;
    if (!this.data.contact) {
      this.title = '新建联系人';
      this.value = null;
    } else {
      this.title = '联系人';
      this.name = this.data.contact[this.options.display];
      this.value = this.data.contact[this.options.valueKey];
    }
  }

  checkRepeat() {
    let repeat = false;
    if (this.data.contacts.find(item => {
      return item[this.options.valueKey] === this.value
    })) {
      repeat = true;
    }
    if (this.data.contact && this.value === this.data.contact[this.options.valueKey]) {
      repeat = false;
    }
    return repeat;
  }

  done() {
    this.dialogRef.close({
      primaryKey: this.data.contact ? this.data.contact[this.options.primaryKey] : null,
      name: this.name,
      value: this.value,
    });
  }

  delete() {
    this.dialog.open(AlertDialogComponent, {
      data: {
        'title': '删除联系人',
        'description': '你确定删除此联系人吗？'
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        _.remove(this.data.contacts, item => {
          return item[this.options.primaryKey] === this.data.contact[this.options.primaryKey];
        })
        this.dialogRef.close();
        const message = '联系人 ' + this.data.contact[this.options.valueKey] + ' 删除成功！';
        this._snackBar.open(message, null, {duration: 2000});
      }
    })
  }

}
