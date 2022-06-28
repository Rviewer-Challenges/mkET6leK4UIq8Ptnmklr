import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Tweet, ApiService } from 'src/app/service/tweets.service';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {

  public text: string = ""

  @Input('tweet') tweet!: Tweet;
  @Input("tweet_id") tweet_id!: number
  @Input("status") status: boolean = false

  public retweet: Tweet | null = null
  public inner_original_tweet: Tweet | null = null

  public responding: boolean = false
  public LOADED: boolean = false


  constructor(private tweetService: ApiService, private router: Router) { }

  ngOnInit(): void {
    if(this.tweet){
      if(this.tweet.type == "retweet" || this.tweet.type == "response"){
        this.tweetService.getTweet(this.tweet.original_tweet).subscribe(
          res => {

            this.retweet = res[0]

            if(this.tweet.type == "normal"){
              this.LOADED = true
            }

            if(this.retweet && this.retweet.type == "retweet" || this.retweet.type == "response"){

              this.tweetService.getTweet(this.retweet.original_tweet).subscribe(

                res => {
                  this.inner_original_tweet = res[0]
                  this.LOADED = true
                }
              )

            }
            else{
              this.LOADED = true
            }
          }
        )
      }
    else{
      this.LOADED = true
    }
    }

    if(this.tweet_id){
      this.tweetService.getTweet(this.tweet_id).subscribe(
        res => {
          this.tweet = res[0]
          this.LOADED = true
        }
      )
    }
  }


  public tweetClicked(event: any): void{

    console.log(event.target.classList)
    if(event.target.classList.contains("hashtag")){
      this.router.navigate(['/search', event.target.innerText.substring(1)])
    }
    else if(event.target.classList.contains("user-link")){
      this.router.navigate([event.target.innerText.substring(1)])
    }

    else if(event.target.classList.contains("user-nick")){
      if(this.tweet.user_nickname == event.target.innerText){
        this.router.navigate([this.tweet.user_name])
      }
      else if(this.retweet != null && this.retweet.user_nickname == event.target.innerText){
        this.router.navigate([this.retweet.user_name])
      }
    }

    else if(event.target.classList.contains("tweet-avatar")){
      if(this.tweet.avatar == event.target.src){
        this.router.navigate([this.tweet.user_name])
      }
      else if(this.retweet != null && this.retweet.avatar == event.target.src){
        this.router.navigate([this.retweet.user_name])
      }
    }

    else if(event.target.classList.contains("retweet-header") && this.retweet){
      this.router.navigate(['/status', this.retweet.tweet_id])
    }


    else if( event.target.classList.contains("tweet-text") || event.target.classList.contains("photo")  || event.target.classList.contains("header")){
      this.router.navigate(['/status', this.tweet.tweet_id])
    }
  }

}

