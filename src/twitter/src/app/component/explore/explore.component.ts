import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/tweets.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getExplore()
  }

}
