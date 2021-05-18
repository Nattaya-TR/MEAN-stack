import { Component } from '@angular/core';
import { OnInit} from "@angular/core";
import { ClientService } from "./client.service";
import { Client } from "./client";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'client';
  AllClients = [{ firstName: 'Nattaya', lastName: 'Trouillard', email: 'nattaya.trouille@gmail.com', phoneNumber: '+32472114366'}];
  ClientModel = new Client();
  ClientList = Client[''];
  submitted = false;
  url = 'http://localhost:6969/allClients';

  onSubmit(): void {
    this.submitted = true;
    this.clientService.addClient(this.ClientModel)
      .subscribe
      (data => console.log(this.ClientModel), error => console.error(error));
  }

  constructor(private clientService: ClientService) {
  }
  public async getAllClients(url: string): Promise<any> {
    return await fetch(this.url, {method: 'get', headers: {'Content-Type': 'application/json'}})
      .then(response => {
        return response.json();
      })
      .then(response => this.AllClients = response);
  }

  ngOnInit(): any {
    this.getAllClients(this.url).then(response => console.log(this.AllClients));
  }

  public async deleteClient(email: string): Promise<any> {
    await fetch(this.url, {method: 'get', headers: {'Content-Type': 'application/json'}})
      .then(response => {
        return response.json() as Promise<any>;
      })
      .then(response => {
        return this.ClientList = response;
      });
    this.ClientList = this.ClientList.filter(friend => friend.email !== email);
  }
}
