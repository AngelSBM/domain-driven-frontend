import { Component } from '@angular/core';
import { Contact } from '../../interfaces/Contact';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent {

  public contacts: Contact[]

}
