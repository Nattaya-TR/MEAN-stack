import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Client } from "./client";
import { Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  url = 'http://localhost:6969/addClient';

  constructor(private http: HttpClient) {

  }

  addClient(newClient : Client ): Observable<any> {
    return this.http.post(this.url, newClient );
  }

}
