import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import { ApiService } from 'src/app/service/tweets.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private titleService:Title, public tweets: ApiService) {}

  ngOnInit(): void {
    this.titleService.setTitle("Inicio / Twitter");
    this.tweets.getHashtags()
    this.tweets.getTimeline()
    this.tweets.getRecommended()
  }
}
