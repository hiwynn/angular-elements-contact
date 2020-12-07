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
      {email: 'grace@gmail.com'},
      {email: 'john@shineteachchina.com'},
      {email: 'frank@qq.com'},
      {email: 'tina@foxmail.com'},
      {email: 'mike@gmail.com'},
      {email: 'sunshine@shineteachchina.com'},
      {email: 'jerry@gmail.com'},
      {email: 'coco@shineteachchina.com'},
      {email: 'alice@gmail.com'},
      {email: 'elsa@foxmail.com'},
      {email: 'emily@gmail.com'},
    ];
    this.contactGroups = [
      {
        groupName: 'colleague',
        members: [
          {email: 'apple@gmail.com'},
          {email: 'orange@shineteachchina.com'},
          {email: 'banana@qq.com'},
        ]
      },
      {
        groupName: 'friend',
        members: [
          {email: 'tina@foxmail.com'},
          {email: 'mike@gmail.com'},
        ]
      },
      {
        groupName: 'family',
        members: [
          {email: 'coco@shineteachchina.com'},
          {email: 'alice@gmail.com'},
          {email: 'elsa@foxmail.com'},
          {email: 'emily@gmail.com'},
        ]
      },
    ];
  }

}

export interface Contact {
  email: string;
}

export interface ContactGroup {
  groupName: string;
  members: Contact[];
}
