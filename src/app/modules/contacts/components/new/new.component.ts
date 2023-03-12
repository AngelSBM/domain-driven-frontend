import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.sass']
})
export class NewComponent {


  public newContactForm: FormGroup = this.fb.group({
    name: this.fb.control('', Validators.required),
    lastname: this.fb.control(''),
    email: this.fb.control(''),
    addresses: this.fb.array([
      this.createAddressFormGroup()
    ])
  });
  // public newAddresses: FormArray;

  constructor(private fb: FormBuilder) {

  }


  get getAddresses() {

    // console.log(this.newContactForm.get('addresses'));

    return (this.newContactForm.get('addresses') as FormArray)
  }

  createAddressFormGroup(): FormGroup {
    return this.fb.group({
      newAddress: this.fb.control('')
    })
  }

  removeAddress(addressIndex: number){
    this.getAddresses.removeAt(addressIndex)
  }

  addContact(){
    this.getAddresses.push( this.createAddressFormGroup() )

    // console.log(this.newContactForm.value);

  }


}
