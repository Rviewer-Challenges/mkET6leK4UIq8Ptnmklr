import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/tweets.service';
import { User, UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-side-recommended',
  templateUrl: './side-recommended.component.html',
  styleUrls: ['./side-recommended.component.scss']
})
export class SideRecommendedComponent implements OnInit {

  constructor(public tweets: ApiService, public user: UserService, private router: Router) { }

  ngOnInit(): void {
    if(this.user.user){
      this.tweets.getRecommended(()=>{
        this.tweets.getRecommended()
      })
    }
  }

  public follow(user: User): void{
    user.following = 1
    this.tweets.follow(user.user_id)
  }

  public unfollow(user: User): void{
    user.following = 0
    this.tweets.unfollow(user.user_id)
  }

  public route(event: any, user: User){
    if(event.target.classList.contains("button")){
      this.router.navigate(["/", user.user_name])
    }
  }

}
