import { Component, Input, OnInit } from '@angular/core';
import { Tweet } from 'src/app/service/tweets.service';

@Component({
  selector: 'app-tweet-decorator',
  templateUrl: './tweet-decorator.component.html',
  styleUrls: ['./tweet-decorator.component.scss']
})
export class TweetDecoratorComponent implements OnInit {

  @Input("tweet") tweet!: Tweet
  @Input("original_tweet") original_tweet: Tweet | null = null

  constructor() { }

  ngOnInit(): void {
  }

}
