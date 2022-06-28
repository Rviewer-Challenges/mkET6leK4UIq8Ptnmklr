import { Component, HostListener, Input, OnInit } from '@angular/core';
import { PostTweet, Tweet, ApiService } from 'src/app/service/tweets.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-tweet-actions',
  templateUrl: './tweet-actions.component.html',
  styleUrls: ['./tweet-actions.component.scss']
})
export class TweetActionsComponent implements OnInit {


  @Input("tweet") tweet!: Tweet
  @Input("original_tweet") original_tweet: Tweet | null = null

  public replying: boolean = false
  public retweeting: boolean = false
  public retweetingMenu: boolean = false

  constructor(private tweetService: ApiService, public user: UserService) { }

  ngOnInit(): void {
    this.updateStatus()
  }



  public updateStatus(): void{
    if(this.original_tweet && this.tweet.type == "retweet" && !this.tweet.text){
      this.tweetService.getTweetStats(this.original_tweet.tweet_id).subscribe(
        {next: (res) =>{
          if(this.original_tweet){
            this.original_tweet.likes = res[0].likes
            this.original_tweet.retweets = res[0].retweets
            this.original_tweet.response = res[0].response
            this.original_tweet.liked = res[0].liked
            this.original_tweet.retweeted = res[0].retweeted
          }
        }
      })
    }

    else{
      this.tweetService.getTweetStats(this.tweet.tweet_id).subscribe(
        {next: (res) =>{
          this.tweet.likes = res[0].likes
          this.tweet.retweets = res[0].retweets
          this.tweet.response = res[0].response
          this.tweet.liked = res[0].liked
          this.tweet.retweeted = res[0].retweeted
        }}
      )
    }
    }


  public liked(): void {
    if(this.original_tweet && this.tweet.type == "retweet" && !this.tweet.text){
      var action = this.original_tweet.liked ? "unlike" : "like"
      this.tweetService.updateLike(this.original_tweet.tweet_id, action, this.tweet).subscribe({error: (err) => {this.updateStatus()}})
    }
    else{
      var action = this.tweet.liked ? "unlike" : "like"
      this.tweetService.updateLike(this.tweet.tweet_id, action, this.tweet)
    }
  }


  public retweet(): void {
    if(this.user.user){
      var tweet = new PostTweet(null,
        this.user.user?.user_id,
        Math.floor(Date.now() / 1000),
        "retweet",
        this.tweet.tweet_id)

        this.tweetService.newTweet(tweet)
        .subscribe(
          {next: (res) =>{
            this.tweetService.updateTimeline()
          }}
        )
    }

  }

}
