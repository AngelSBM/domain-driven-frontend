import { Component, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, catchError } from "rxjs";
import { ContactService } from '../../services/contact.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.sass']
})
export class NewComponent implements OnDestroy {

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
              private contactService: ContactService,
              private toastr: ToastrService,
              private router: Router) { }


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

  addAddress(){
    this.getAddresses.push( this.createAddressFormGroup() )
  }

  saveContact(){

    if(!this.newContactForm.valid){
      this.toastr.error('Some inputs are empty.', 'Required fields');
      return
    }

    const newAddresses = this.getAddresses.value.map((address: { newAddress: string }) => { return { addressLine: address.newAddress } } )

    const newContact = {
      name: this.newContactForm.controls['name'].value,
      lastname: this.newContactForm.controls['lastname'].value,
      email: this.newContactForm.controls['email'].value,
      newAddresses
    }


    this.newContactSub =
    this.contactService
    .createContact(newContact)
    .subscribe(createdContact => {
            this.toastr.success(`${createdContact.name} is now in your contact list.`, 'Contact created');
            setTimeout(() => {
              this.router.navigate(['/'])
            }, 3000);
          })

  }


  ngOnDestroy(): void {
    if(this.newContactSub){
      this.newContactSub.unsubscribe()
    }
  }


}
