import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from "rxjs";
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../interfaces/Contact';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from '../../interfaces/Address';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.sass']
})
export class UpdateComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = []
  public contact: Contact
  public contactForm: FormGroup = this.fb.group({
    name: this.fb.control('', Validators.required),
    lastname: this.fb.control(''),
    email: this.fb.control(''),
    addresses: this.fb.array([
      this.createAddressFormGroup()
    ])
  })

  constructor(private contactService: ContactService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    const contactId = this.activatedRoute.snapshot.params['id'];

    const getContactByIdSub: Subscription =
    this.contactService
        .getContactById(contactId)
        .subscribe(contact => {
          this.contact = contact
          this.setFormData();
        })

    this.subscriptions.push(getContactByIdSub)
  }

  private setFormData(){
    this.contactForm.controls['name'].setValue(this.contact.name)
    this.contactForm.controls['lastname'].setValue(this.contact.lastname)
    this.contactForm.controls['email'].setValue(this.contact.email);

    this.contact.addresses.forEach((address, index) => {
      if(this.getAddresses().controls[index]){
        this.getAddresses().controls[index].controls['address'].setValue(address.addressLine)
      }else{
        this.addAddress()
        this.getAddresses().controls[index].controls['address'].setValue(address.addressLine)
      }

    })

  }

  getAddresses(): FormArray<FormGroup>{
    return (this.contactForm.get('addresses') as FormArray)
  }

  createAddressFormGroup(): FormGroup {
    return this.fb.group({
      address: this.fb.control('', Validators.required)
    })
  }

  addAddress(){
    this.getAddresses().controls.push( this.createAddressFormGroup() )
  }

  deleteAddress(addressIndex: number){

    if( !this.contact.addresses[addressIndex] ){
      this.getAddresses().removeAt(addressIndex)
      return
    }

    const deleteAddressSub: Subscription =
      this.contactService
          .deleteAddress( this.contact.addresses[addressIndex].id! )
          .subscribe(response => {
              this.toastr.success(response.message, 'Success')
              this.getAddresses().removeAt(addressIndex)
              setTimeout(() => {
                this.router.navigate(['/'])
              }, 2000);
          })

    this.subscriptions.push(deleteAddressSub)
  }


  deleteContact(){

    const deleteContactSub: Subscription =
      this.contactService
          .deleteContact( this.contact.id )
          .subscribe(response => {
              this.toastr.success(response.message, 'Success')
              setTimeout(() => {
                this.router.navigate(['/'])
              }, 2000);
          })

    this.subscriptions.push( deleteContactSub )

  }


  updateContact(){

    if(!this.contactForm.valid){
      this.toastr.error('Some inputs are empty', 'Error')
      return
    }

    const updatedContact = {
      id: this.contact.id,
      name: this.contactForm.controls['name'].value,
      lastname: this.contactForm.controls['lastname'].value,
      email: this.contactForm.controls['email'].value,
      addresses: this.getUpdatedAddressesList()
    }

    const updateContactSub: Subscription =
      this.contactService
          .updateContact( updatedContact )
          .subscribe(response => {
              this.toastr.success(`${response.name} info was updated.`, 'Success')
              setTimeout(() => {
                this.router.navigate(['/'])
              }, 2000);
          })

    this.subscriptions.push( updateContactSub )

  }



  getUpdatedAddressesList(): Address[]{
    let updatedAddresses: Address[] = []

    updatedAddresses = this.getAddresses().controls.map( formGroup => {

      const addressValue = formGroup.controls['address'].value
      const indexOfAddressInContactArray = this.contact.addresses.findIndex(c => c.addressLine === addressValue)

      if(indexOfAddressInContactArray !== -1){
        return {
          id: this.contact.addresses[indexOfAddressInContactArray].id,
          addressLine: formGroup.controls['address'].value
        }
      }else{
        return {
          addressLine: formGroup.controls['address'].value
        }

      }

    } )

    return updatedAddresses

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( sub => sub.unsubscribe() )
  }


}
