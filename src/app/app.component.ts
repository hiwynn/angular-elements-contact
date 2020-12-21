import { Component, Injector, OnInit } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { PopupService } from './popup.service';
import { PopupComponent } from './popup.component';
import { ContactComponent } from "./contact/contact.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  contacts: Contact[];
  contactGroups: ContactGroup[];

  constructor(injector: Injector, public popup: PopupService) {
    // Convert `PopupComponent` to a custom element.
    const PopupElement = createCustomElement(PopupComponent, {injector});
    // Register the custom element with the browser.
    customElements.define('popup-element', PopupElement);

    const ContactElement = createCustomElement(ContactComponent, {injector});
    customElements.define('contact-receiver', ContactElement);
  }

  ngOnInit() {
    this.mockData();
  }

  mockData() {
    this.contacts = [
      {id: 1, email: 'grace@gmail.com'},
      {id: 2, email: 'john@shineteachchina.com'},
      {id: 3, email: 'frank@qq.com'},
      {id: 4, email: 'tina@foxmail.com'},
      {id: 5, email: 'mike@gmail.com'},
      {id: 6, email: 'sunshine@shineteachchina.com'},
      {id: 7, email: 'jerry@gmail.com'},
      {id: 8, email: 'coco@shineteachchina.com'},
      {id: 9, email: 'alice@gmail.com'},
      {id: 10, email: 'elsa@foxmail.com'},
      {id: 11, email: 'emily@gmail.com'},
    ];
    this.contactGroups = [
      {
        groupName: 'colleague',
        members: [
          {id: 12,email: 'apple@gmail.com'},
          {id: 13,email: 'orange@shineteachchina.com'},
          {id: 14,email: 'banana@qq.com'},
        ]
      },
      {
        groupName: 'friend',
        members: [
          {id: 4,email: 'tina@foxmail.com'},
          {id: 5,email: 'mike@gmail.com'},
        ]
      },
      {
        groupName: 'family',
        members: [
          {id: 8,email: 'coco@shineteachchina.com'},
          {id: 9,email: 'alice@gmail.com'},
          {id: 10,email: 'elsa@foxmail.com'},
          {id: 11,email: 'emily@gmail.com'},
        ]
      },
    ];
  }

}

export interface Contact {
  id: number;
  email: string;
}

export interface ContactGroup {
  groupName: string;
  members: Contact[];
}
