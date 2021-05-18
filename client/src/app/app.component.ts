import { Component } from '@angular/core';
import { OnInit} from "@angular/core";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'client';
  ClientModel = new ();
  languages = ['HTML', 'CSS', 'JavaScript', 'PHP', 'Symfony', 'Angular'];
  submitted = false;
  AllFriends = [{firstname: 'Coach', lastname: 'Tim', email: 'tim.broos@becode.org', phoneNumber: '0469420666', language: 'JavaScript'}];
  url = 'http://localhost:9003/allFriends';

  onSubmit(): void {
    this.submitted = true;
    this.addFriendService.addFriend(this.ClientModel)
      .subscribe
      (data => console.log(this.ClientModel), error => console.error(error));
  }

  constructor(private addFriendService: AddFriendService) {
  }
  public async getAllFriend(url: string): Promise<any> {
    return await fetch(this.url, {method: 'get', headers: {'Content-Type': 'application/json'}})
      .then(response => {
        return response.json();
      })
      .then(response => this.AllFriends = response);
  }
  ngOnInit(): any {
    this.getAllFriend(this.url).then(response => console.log(this.AllFriends));
  }
}
