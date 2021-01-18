import { Component, Injector, OnInit } from '@angular/core';
import { createCustomElement, NgElement, WithProperties } from '@angular/elements';
import { PopupService } from './popup.service';
import { PopupComponent } from './popup.component';
import { ContactComponent } from "./contact/contact.component";
import { ShowSelectReceiverComponent } from "./contact/show-select-receiver/show-select-receiver.component";
import { ShowCreateGroupComponent } from "./contact/show-create-group/show-create-group.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  contacts: Contact[];
  contactGroups: ContactGroup[];
  options;

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
    popupEl.setAttribute('options', JSON.stringify(this.options));
    popupEl.setAttribute('contacts', JSON.stringify(this.contacts));
    popupEl.setAttribute('groups', JSON.stringify(this.contactGroups));
    document.body.appendChild(popupEl);

    popupEl.addEventListener('closed', (receivers) => {
      console.log(receivers);
      document.body.removeChild(popupEl)
    });
  }

  mockData() {
    this.options = {
      type: 'email', // email, phone, QQ
      primaryKey: 'id',
      display: 'name', // 显示 字段
      valueKey: 'email' // email, phone, QQ 的值
    }
    this.contacts = [
      {id: 1, name: 'Grace Johnson', email: 'grace@gmail.com', selected: false},
      {id: 2, name: 'John Rodriguez', email: 'john@shineteachchina.com', selected: false},
      {id: 3, name: 'Frank Brown', email: 'frank@qq.com', selected: false},
      {id: 4, name: 'Tina Johnson', email: 'tina@foxmail.com', selected: false},
      {id: 5, name: 'Mike Brown', email: 'mike@gmail.com', selected: false},
      {id: 6, name: 'Sunshine Wilson', email: 'sunshine@shineteachchina.com', selected: false},
      {id: 7, name: 'Jerry Johnson', email: 'jerry@gmail.com', selected: false},
      {id: 8, name: 'Coco Wilson', email: 'coco@shineteachchina.com', selected: false},
      {id: 9, name: 'Alice Rodriguez', email: 'alice@gmail.com', selected: false},
      {id: 10, name: 'Elsa Brown', email: 'elsa@foxmail.com', selected: false},
      {id: 11, name: 'Emily Johnson', email: 'emily@gmail.com', selected: false},
      {id: 12, name: 'Apple Rodriguez', email: 'apple@gmail.com', selected: false},
      {id: 13, name: 'Orange Johnson', email: 'orange@shineteachchina.com', selected: false},
      {id: 14, name: 'Banana Brown', email: 'banana@qq.com', selected: false},
    ];
    this.contactGroups = [
      {
        groupName: 'colleague',
        selected: false,
        members: [
          {id: 2, name: 'John Rodriguez', email: 'john@shineteachchina.com', selected: false},
          {id: 3, name: 'Frank Brown', email: 'frank@qq.com', selected: false},
          {id: 4, name: 'Tina Johnson', email: 'tina@foxmail.com', selected: false},
        ]
      },
      {
        groupName: 'friend',
        selected: false,
        members: [
          {id: 4, name: 'Tina Johnson', email: 'tina@foxmail.com', selected: false},
          {id: 5, name: 'Mike Wilson', email: 'mike@gmail.com', selected: false},
        ]
      },
      {
        groupName: 'family',
        selected: false,
        members: [
          {id: 8, name: 'Coco Rodriguez', email: 'coco@shineteachchina.com', selected: false},
          {id: 9, name: 'Alice Wilson', email: 'alice@gmail.com', selected: false},
          {id: 10, name: 'Elsa Johnson', email: 'elsa@foxmail.com', selected: false},
          {id: 11, name: 'Emily Brown', email: 'emily@gmail.com', selected: false},
        ]
      },
    ];
  }

}

export interface Contact {
  id: number;
  email: string;
  name: string;
  selected: boolean;
}

export interface ContactGroup {
  groupName: string;
  selected: boolean;
  members: Contact[];
}
