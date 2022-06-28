import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/tweets.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent implements OnInit {

  constructor(
    public tweets: ApiService,
  ) { }

  ngOnInit(): void {
    this.tweets.getHashtags()
  }

}
