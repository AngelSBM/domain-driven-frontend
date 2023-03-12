import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { API_URL } from "src/enviroment/enviroment.dev";
import { Contact } from '../interfaces/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private baseUrl = API_URL + 'Contact/';

  constructor(private httpClient: HttpClient) { }

  getContacts(): Observable<Contact[]>{
    const url = this.baseUrl + 'GetAll';
    return this.httpClient.get<Contact[]>(url);
  }

  createContact(body: Object): Observable<Contact> {
    const url = this.baseUrl + 'GetAll';
    return this.httpClient.post<Contact>(url, body);
  }

}
