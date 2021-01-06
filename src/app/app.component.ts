import { Component, Injector, OnInit } from '@angular/core';
import { createCustomElement, NgElement, WithProperties } from '@angular/elements';
import { PopupService } from './popup.service';
import { PopupComponent } from './popup.component';
import { ContactComponent } from "./contact/contact.component";
import { SelectReceiverComponent } from "./contact/select-receiver/select-receiver.component";
import { ShowSelectReceiverComponent } from "./contact/show-select-receiver/show-select-receiver.component";
import { ShowCreateGroupComponent } from "./contact/show-create-group/show-create-group.component";

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

    const CreateGroupElement = createCustomElement(ShowCreateGroupComponent, {injector});
    customElements.define('create-group', CreateGroupElement);

    const SelectReceiverElement = createCustomElement(ShowSelectReceiverComponent, {injector});
    customElements.define('select-receiver', SelectReceiverElement);
  }

  ngOnInit() {
    this.mockData();
  }

  showCreateGroupElement() {
    const popupEl = document.createElement('create-group');
    popupEl.addEventListener('closed', () => document.body.removeChild(popupEl));
    document.body.appendChild(popupEl);
  }

  showSelectReceiverElement() {
    const popupEl = document.createElement('select-receiver');
    // popupEl.setAttribute('options': this.contactGroups);
    popupEl.addEventListener('closed', () => document.body.removeChild(popupEl));
    document.body.appendChild(popupEl);
  }

  mockData() {
    this.contacts = [
      {id: 1, email: 'grace@gmail.com', selected: false},
      {id: 2, email: 'john@shineteachchina.com', selected: false},
      {id: 3, email: 'frank@qq.com', selected: false},
      {id: 4, email: 'tina@foxmail.com', selected: false},
      {id: 5, email: 'mike@gmail.com', selected: false},
      {id: 6, email: 'sunshine@shineteachchina.com', selected: false},
      {id: 7, email: 'jerry@gmail.com', selected: false},
      {id: 8, email: 'coco@shineteachchina.com', selected: false},
      {id: 9, email: 'alice@gmail.com', selected: false},
      {id: 10, email: 'elsa@foxmail.com', selected: false},
      {id: 11, email: 'emily@gmail.com', selected: false},
    ];
    this.contactGroups = [
      {
        groupName: 'colleague',
        selected: false,
        members: [
          {id: 12, email: 'apple@gmail.com', selected: false},
          {id: 13, email: 'orange@shineteachchina.com', selected: false},
          {id: 14, email: 'banana@qq.com', selected: false},
        ]
      },
      {
        groupName: 'friend',
        selected: false,
        members: [
          {id: 4, email: 'tina@foxmail.com', selected: false},
          {id: 5, email: 'mike@gmail.com', selected: false},
        ]
      },
      {
        groupName: 'family',
        selected: false,
        members: [
          {id: 8, email: 'coco@shineteachchina.com', selected: false},
          {id: 9, email: 'alice@gmail.com', selected: false},
          {id: 10, email: 'elsa@foxmail.com', selected: false},
          {id: 11, email: 'emily@gmail.com', selected: false},
        ]
      },
    ];
  }

}

export interface Contact {
  id: number;
  email: string;
  selected: boolean;
}

export interface ContactGroup {
  groupName: string;
  selected: boolean;
  members: Contact[];
}
