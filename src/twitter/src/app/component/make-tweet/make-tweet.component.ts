import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostTweet, Tweet, ApiService } from 'src/app/service/tweets.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-make-tweet',
  templateUrl: './make-tweet.component.html',
  styleUrls: ['./make-tweet.component.scss']
})
export class MakeTweetComponent implements OnInit {


  @Input("retweet") retweet: Tweet | null = null
  @Input("response") response: Tweet | null = null
  @Output( "close") close = new EventEmitter<void>()

  form : FormGroup

  public imageCount = 0;

  public placeholder: string = "¿Que Esta Pasando?"
  public text: string = ""
  private textArea: HTMLTextAreaElement | null = null


  constructor(public user: UserService, public tweet: ApiService, formBuilder: FormBuilder) {
    this.form = formBuilder.group({photo_1 : null, photo_2: null, photo_3: null, photo_4: null})
  }


  ngOnInit(): void {
    if(this.retweet){
      this.placeholder = "Añade un comentario"
    }
    else if(this.response){
      this.placeholder = "Twittea tu respuesta"
    }
    else{
      this.placeholder = "¿Que Esta Pasando?"
    }
  }


  public textAreaUpdate(textArea: any): void {
    this.text = textArea.value
    if(!this.textArea) {this.textArea = textArea}
  }


  public validText(): boolean {
    return this.text.length > 0 && this.text.length < 320
  }


  public numberOfRows(): number {
    return this.text.split(/\r\n|\r|\n/).length + 1
  }


  public newTweet(): void {
    this.imageCount = 0
    if(this.user.user){

      if(this.response != null){

        if(this.response.type == "retweet" && this.response.original_tweet == null){

          var tweet = new PostTweet(this.text.replace(/\r\n|\r|\n/g, " <br> "),
          this.user.user?.user_id,
          Math.floor(Date.now() / 1000),
          "response",
          this.response.original_tweet,
          this.form.controls["photo_1"].value,
          this.form.controls["photo_2"].value,
          this.form.controls["photo_3"].value,
          this.form.controls["photo_4"].value)
        }
        else{
          var tweet = new PostTweet(this.text.replace(/\r\n|\r|\n/g, " <br> "),
          this.user.user?.user_id,
          Math.floor(Date.now() / 1000),
          "response",
          this.response.tweet_id,
          this.form.controls["photo_1"].value,
          this.form.controls["photo_2"].value,
          this.form.controls["photo_3"].value,
          this.form.controls["photo_4"].value)
        }

      }
      else if(this.retweet != null){
        var tweet = new PostTweet(this.text.replace(/\r\n|\r|\n/g, " <br> "),
                                  this.user.user?.user_id,
                                  Math.floor(Date.now() / 1000),
                                  "retweet",
                                  this.retweet.tweet_id,
                                  this.form.controls["photo_1"].value,
                                  this.form.controls["photo_2"].value,
                                  this.form.controls["photo_3"].value,
                                  this.form.controls["photo_4"].value)
      }
      else{
        var tweet = new PostTweet(this.text.replace(/\r\n|\r|\n/g, " <br> "),
                                  this.user.user?.user_id,
                                  Math.floor(Date.now() / 1000),
                                  "normal",
                                  null,
                                  this.form.controls["photo_1"].value,
                                  this.form.controls["photo_2"].value,
                                  this.form.controls["photo_3"].value,
                                  this.form.controls["photo_4"].value)
      }
      console.log(this.form.controls["photo_1"].value)
      console.log(tweet)


      this.tweet.newTweet(tweet)
      .subscribe(
        {next: (res) =>{
          this.tweet.updateTimeline()
        }}
      )


      this.text = ""
      if(this.textArea){
        this.textArea.value = ""
      }
      this.close.emit()
    }
  }

}
