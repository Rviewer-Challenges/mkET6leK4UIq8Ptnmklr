import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/tweets.service';
import { User, UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public name: string = "";

  public user: User | null = null
  public mode: string = "normal"
  public edit: boolean = false



  constructor(
    public tweets: ApiService,
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params : any) => {
      this.name = params.params['username']
      this.tweets.searchUserTweets(this.name, this.mode)
      this.getUserData()

    });
  }


  public unfollow(): void {
    if(this.user){
      this.tweets.unfollow(this.user.user_id, ()=>{
        this.getFollowersStats()
      })
    }
  }

  public follow(): void {
    if(this.user){
      this.tweets.follow(this.user.user_id, ()=>{
        this.getFollowersStats()
      })

    }
  }


  public getFollowersStats(): void {
    if(this.user){
      this.tweets.getFollowersStats(this.user.user_id)
      .subscribe(
        stats => {
          console.log("UPDATING USER")
          if(this.user){
            this.user.followers = stats[0].followers
            this.user.following = stats[0].following
            this.user.followed = stats[0].followed
          }

        })
    }
  }


  public getUserData(): void {
    this.tweets.getUser(this.name)
    .subscribe(
      user => {
        this.user = user[0]
        this.getFollowersStats()
      }
    )
  }


  public closeEdit(): void{
    this.getUserData()
    this.edit = false
  }

  public setMode(mode: string): void{
    if(mode != this.mode){
      this.mode = mode
      this.tweets.searchUserTweets(this.name, mode)
    }
  }


  public parseDescription(text: string | any): string {
    if(text){
      var tex = text.replace(/#\w*/g, "<a class='hashtag'>$&</a>")
      tex = tex.replace(/#\w*/, "<a class='hashtag'>$&</a>")
      tex = tex.replace(/@\w*/g, "<a class='user-link'>$&</a>")
    }
    return tex
  }

  public tweetClicked(event: any): void{
    console.log(event.target)
    if(event.target.classList.contains("hashtag")){
      console.log("hashtag clicked")
      this.user = null
      this.router.navigate(['/search', event.target.innerText.substring(1)])
    }
    if(event.target.classList.contains("user-link")){
      this.user = null
      this.router.navigate([event.target.innerText.substring(1)])
    }
    if(event.target.classList.contains("followed")){
      this.unfollow()
    }
    if(event.target.classList.contains("follow")){
      this.follow()
    }
  }

}
