import { Component, Input, OnInit } from '@angular/core';
import { Tweet } from 'src/app/service/tweets.service';

@Component({
  selector: 'app-tweet-username',
  templateUrl: './tweet-username.component.html',
  styleUrls: ['./tweet-username.component.scss']
})
export class TweetUsernameComponent implements OnInit {

  @Input("tweet") tweet!: Tweet
  @Input("original_tweet") original_tweet: Tweet | null = null

  constructor() { }

  ngOnInit(): void {
  }


  public moreThanADay(): boolean {
    return Date.now() - this.tweet.timestamp * 1000 > 86400000
  }


  public isToday(): boolean {
    return this.tweet.timestamp * 1000 > Date.now() - 86400000 && Date.now() - this.tweet.timestamp * 1000 > 3600000
  }

  public lessThanAHour(): boolean {
    return Date.now() - this.tweet.timestamp * 1000 < 3600000 && Date.now() - this.tweet.timestamp * 1000 > 60000
  }

  public lessThanAMinute(): boolean {
    return Date.now() - this.tweet.timestamp * 1000 < 60000
  }

  public seconds(): number {
    return Math.floor((Date.now() - this.tweet.timestamp * 1000) / 1000)
  }

  public mins(): number {
    return Math.floor((Date.now() - this.tweet.timestamp * 1000) / 60000)
  }

  public hours(): number {
    return Math.floor((Date.now() - this.tweet.timestamp * 1000) / 3600000)
  }


}
