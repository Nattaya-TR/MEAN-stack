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
  AllClients = [''];
  ClientModel = new Client();
  submitted = false;
  url = 'http://localhost:6969/allclients';

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
}
