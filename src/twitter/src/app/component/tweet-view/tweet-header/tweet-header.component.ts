import { Component, Input, OnInit } from '@angular/core';
import { Tweet } from 'src/app/service/tweets.service';

@Component({
  selector: 'app-tweet-header',
  templateUrl: './tweet-header.component.html',
  styleUrls: ['./tweet-header.component.scss']
})
export class TweetHeaderComponent implements OnInit {

  @Input("tweet") tweet!: Tweet
  @Input("inner") innerReference: boolean = false
  @Input("original_tweet") original_tweet: Tweet | null = null

  constructor() { }

  ngOnInit(): void {
  }

}
