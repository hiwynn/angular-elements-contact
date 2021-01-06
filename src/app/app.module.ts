import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PopupComponent } from './popup.component';
import { PopupService } from './popup.service';
import { MatButtonModule } from "@angular/material/button";
import { ContactComponent } from './contact/contact.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDialogModule } from "@angular/material/dialog";
import { CreateGroupDialogComponent } from './contact/create-group-dialog/create-group-dialog.component';
import { SelectReceiverComponent } from './contact/select-receiver/select-receiver.component';
import { MatExpansionModule } from "@angular/material/expansion";
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShowSelectReceiverComponent } from './contact/show-select-receiver/show-select-receiver.component';
import { ShowCreateGroupComponent } from './contact/show-create-group/show-create-group.component';

// Include the `PopupService` provider,
// but exclude `PopupComponent` from compilation,
// because it will be added dynamically.

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    MatIconModule, MatAutocompleteModule, MatDialogModule, MatExpansionModule, FlexLayoutModule],
  providers: [PopupService],
  declarations: [AppComponent, PopupComponent, ContactComponent, CreateGroupDialogComponent, SelectReceiverComponent, ShowSelectReceiverComponent, ShowCreateGroupComponent],
  bootstrap: [AppComponent],
  entryComponents: [PopupComponent],
})
export class AppModule {
}
