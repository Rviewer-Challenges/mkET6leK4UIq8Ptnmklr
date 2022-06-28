import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  public user: User | null = null

  private bURL: string = "https://singlevoid.com/twitter/api"


  constructor(public client: HttpClient) {
    let user = localStorage.getItem('user')
    if(user){
      this.user = JSON.parse(user)
    }
  }

  public close(){
    this.user = null
    localStorage.removeItem('user')
  }

  public postUser(user: string, password: string, register: boolean = false): Observable<User[]> {
    var url = this.bURL + '/users.php'
    if(register){url = url + "?register=true"}
    console.log(register)
    return this.client.post<User[]>(url, {username: user, password: password});
  }


  public setUser(user: User): void {
    this.user = user
    localStorage.setItem('user', JSON.stringify(user))
  }
}


export class User{

constructor(public user_id: number,
            public user_name: string,
            public user_nickname: string,
            public verified: number,
            public description: string,
            public avatar: string,
            public following: number,
            public background: string,
            public followers: number,
            public fixed_tweet: number,
            public total_tweets: number,
            public followed: number){}

}
