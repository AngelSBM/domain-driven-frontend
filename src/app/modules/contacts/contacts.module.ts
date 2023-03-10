import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { NewComponent } from './components/new/new.component';
import { ContactsRoutingModule } from './contacts-routing.module';



@NgModule({
  declarations: [
    ListComponent,
    NewComponent
  ],
  imports: [
    CommonModule,
    ContactsRoutingModule
  ]
})
export class ContactsModule { }
