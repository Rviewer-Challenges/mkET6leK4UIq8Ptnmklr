import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/tweets.service';
import { User, UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-follow-lists',
  templateUrl: './follow-lists.component.html',
  styleUrls: ['./follow-lists.component.scss']
})
export class FollowListsComponent implements OnInit {

  private name : string = "";
  public user: User | null = null
  public usersList: User[] = []

  public mode: string = ""

  constructor(public api: ApiService,  private route: ActivatedRoute,public router: Router, public userService: UserService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params : any) => {
      this.name = params.params['username']
      this.api.getUser(this.name).subscribe(user => {
        this.user = user[0]
        this.setMode(params.params['followMode'])
        console.log(this.usersList)
      })

    });
  }

  public getFollowing(): void{
    if(this.user){
      this.api.getFollowingList(this.user.user_id).subscribe(following => {
        this.usersList = following
        console.log(this.usersList)
    })
    }

  }

  public getFollowers(): void{
    if(this.user){
      this.api.getFollowersList(this.user.user_id).subscribe(following => {
        this.usersList = following
        console.log(this.usersList)
    })
  }
  }


  public userClicked(event: any, user: User): void{
    if(event.target.classList.contains("follow")){
      this.follow(user)
    }
    else if(event.target.classList.contains("followed")){
      this.unfollow(user)
    }
    else{
      this.router.navigate(['', user.user_name])
    }
  }


  public unfollow(user: User): void {
    this.api.unfollow(user.user_id, ()=>{
      this.updateList()
    })

  }

  public follow(user: User): void {
      this.api.follow(user.user_id, ()=>{
        this.updateList()
      })

  }


  public updateList(): void{
    if(this.mode == "following"){
      this.getFollowing()
    }
    else{
      this.getFollowers()
    }
  }


  public setMode(mode: string ): void{
    if(this.mode != mode){
      this.mode = mode
      this.usersList = []
      this.updateList()
      console.log(this.usersList)
    }
  }

}
