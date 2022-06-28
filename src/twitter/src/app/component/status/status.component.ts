import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, Tweet } from 'src/app/service/tweets.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  statusId: number = 0
  tweet: Tweet | null = null

  constructor(private route: ActivatedRoute, public tweets: ApiService) { }

  ngOnInit(): void {
    this.tweets.timeline = []
    this.route.paramMap.subscribe((params : any) => {
      this.statusId = params.params['tweetId']
      this.tweets.getTweet(this.statusId).subscribe(
        res => {
          this.tweet = res[0]
          this.tweets.getResponses(this.tweet.tweet_id)
        }

      )

    });

  }

}
