import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/tweets.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  @Input("status") status: boolean = false

  constructor(public tweets: ApiService) { }

  ngOnInit(): void {
    this.tweets.getRecommended()
    this.tweets.getHashtags()
  }

}
