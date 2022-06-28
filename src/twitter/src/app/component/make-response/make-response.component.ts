import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Tweet, ApiService } from 'src/app/service/tweets.service';

@Component({
  selector: 'app-make-response',
  templateUrl: './make-response.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./make-response.component.scss']
})
export class MakeResponseComponent implements OnInit {


  public text = ""

  @Input("mode") mode!: string

  @Input("tweet") tweet!: Tweet;
  @Output( "close") close = new EventEmitter<void>()

  constructor(public tweetService: ApiService) { }

  ngOnInit(): void {
    document.body.style.overflow = "hidden";
    this.text = this.tweetService.parseTweetText(this.tweet.text)
  }


  public click(event: any): void{
    console.log(event)
    if(event.target.classList.contains("response-container") || event.target.classList.contains("close-btn")){
      document.body.style.overflow = "auto";
      this.close.emit()
  }
}

}
