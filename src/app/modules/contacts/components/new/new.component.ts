import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from "rxjs";
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.sass']
})
export class NewComponent {


  private newContactSub: Subscription

  public newContactForm: FormGroup = this.fb.group({
    name: this.fb.control('', Validators.required),
    lastname: this.fb.control(''),
    email: this.fb.control(''),
    addresses: this.fb.array([
      this.createAddressFormGroup()
    ])
  });

  constructor(private fb: FormBuilder,
              private contactService: ContactService) { }


  get getAddresses() {
    return (this.newContactForm.get('addresses') as FormArray)
  }

  createAddressFormGroup(): FormGroup {
    return this.fb.group({
      newAddress: this.fb.control('', Validators.required)
    })
  }

  removeAddress(addressIndex: number){
    this.getAddresses.removeAt(addressIndex)
  }

  addContact(){
    this.getAddresses.push( this.createAddressFormGroup() )
  }

  saveContact(){

  }


}
