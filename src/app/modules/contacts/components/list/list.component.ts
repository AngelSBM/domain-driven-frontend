import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from '../../interfaces/Contact';
import { Subscription } from "rxjs";
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit, OnDestroy  {

  public contactsArrData: Contact[]
  public contactsArrFiltered: Contact[]
  public contactsSub: Subscription

  constructor(private contactService: ContactService) {
  }

  ngOnInit(): void {
    this.contactsSub =
      this.contactService
          .getContacts()
          .subscribe(contacts => {
            this.contactsArrData = contacts
            this.contactsArrFiltered = contacts
          })
  }

  searchContact(value: string){
    if(value === ''){
      this.contactsArrFiltered = this.contactsArrData
    }
    this.contactsArrFiltered = this.contactsArrFiltered
                                   .filter(c => c.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
                                        || c.lastname.toLocaleLowerCase().includes(value.toLocaleLowerCase() ))
  }

  ngOnDestroy(): void {
    this.contactsSub.unsubscribe()
  }

}
