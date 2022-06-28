import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-tweet-text',
  templateUrl: './tweet-text.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./tweet-text.component.scss']
})
export class TweetTextComponent implements OnInit {


  @Input("text") text!: string
  public parsedText: string = ""

  constructor() { }

  ngOnInit(): void {
    if(this.text){
      this.parseTweetText(this.text)
    }
  }

  public parseTweetText(text: string): string {
    this.parsedText = text.replace(/#\w*/g, "<a class='hashtag'>$&</a>")
    this.parsedText = this.parsedText.replace(/@\w*/g, "<a class='user-link'>$&</a>")
    this.parsedText = this.parsedText.replace(/https?:\/\/\S*/g, this.parseLink)
    return this.parsedText
  }

  public parseLink(link: string): string {

    var show_text= ""
    if(link.length > 20){
      show_text = link.substring(0,20) + "..."
    }
    else{
      show_text = link
    }

    return `<a class='link' target='_blank' href='${link}'>${show_text}</a>`
  }

}
