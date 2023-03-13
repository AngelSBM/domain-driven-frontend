import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from "rxjs";
import { API_URL } from "src/enviroment/enviroment.dev";
import { Contact } from '../interfaces/Contact';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private baseUrl = API_URL + 'Contact/';

  constructor(private httpClient: HttpClient,
              private toastr: ToastrService) { }


  getContactById(contactId: number): Observable<Contact>{
    const url = this.baseUrl + contactId;
    return this.httpClient.get<Contact>(url);
  }

  getContacts(): Observable<Contact[]>{
    const url = this.baseUrl + 'GetAll';
    return this.httpClient.get<Contact[]>(url);
  }

  createContact(body: Object): Observable<Contact> {
    const url = this.baseUrl + 'Create';
    return this.httpClient.post<Contact>(url, body)
                .pipe( catchError(error => this.handleError(error)) );
  }

  updateContact(body: Object): Observable<Contact> {
    const url = this.baseUrl + 'Update';
    return this.httpClient.put<Contact>(url, body)
                .pipe( catchError(error => this.handleError(error)) );
  }

  deleteContact(contactId: number): Observable<{ message: string }> {
    const url = `${this.baseUrl}Delete/${contactId}`;
    return this.httpClient.delete<{ message: string }>(url)
                .pipe( catchError(error => this.handleError(error)) );
  }

  deleteAddress(addressId: number): Observable<{ message: string }> {
    const url = `${this.baseUrl}DeleteAddress/${addressId}`;
    return this.httpClient.delete<{ message: string }>(url)
                .pipe( catchError(error => this.handleError(error)) );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred.
      console.error('An error occurred:', error.error);
    } else {
      //Backend error
      error.error.errors.forEach( (error: string)=> {
        this.toastr.error(error, 'Error')
      });
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
