import { Component, Input, OnInit } from '@angular/core';
import { Tweet } from 'src/app/service/tweets.service';

@Component({
  selector: 'app-tweet-image-container',
  templateUrl: './tweet-image-container.component.html',
  styleUrls: ['./tweet-image-container.component.scss']
})
export class TweetImageContainerComponent implements OnInit {

  @Input("tweet") tweet!: Tweet

  constructor() { }

  ngOnInit(): void {
  }

}
