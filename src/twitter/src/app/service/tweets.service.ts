import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public timeline: Tweet[] = []
  public trending: Hashtag[] = []
  public recommended: User[] = []

  public timelineMode: TimeLineMode = new TimeLineMode("ttimeline")


  public LOADING_TWEETS: boolean = true

  public currentTimelineMode: string = "timeline"
  private bURL: string = "https://singlevoid.com/twitter/api"


  constructor(public client: HttpClient, private userService: UserService) { }



  public updateCurrentTimeline(): void {
    if(this.currentTimelineMode == "timeline"){
      this.getTimeline()
    }

  }

  public getExplore(): void {
    this.LOADING_TWEETS = true
    this.client.get<Tweet[]>(`${this.bURL}/explore.php?user_id=${this.userService.user?.user_id}`)
    .subscribe(
      {next: (tweets) => {
        this.LOADING_TWEETS = false
        this.timeline = tweets
      }}
    )
  }

  public editProfile(username: string, avatar: string, background: string, description: string): void {
    this.client.post(`${this.bURL}/editProfile.php?user_id=${this.userService.user?.user_id}`, {user_nickname: username, avatar: avatar, background: background, description: description})
    .subscribe()

  }


  public getResponses(tweet_id: number): void {
    this.LOADING_TWEETS = true
    this.client.get<Tweet[]>(`${this.bURL}/tweetResponse.php?tweet_id=${tweet_id}`)
    .subscribe(
      {next: (tweets) => {
        this.LOADING_TWEETS = false
        this.timeline = tweets
      }}
    )
  }

  public getFollowingList(user_id:number): Observable<User[]>{
    return this.client.get<User[]>(this.bURL + `/followingList.php?user_id=${user_id}&me=${this.userService.user?.user_id}`)
  }

  public getFollowersList(user_id:number): Observable<User[]>{
    return this.client.get<User[]>(this.bURL + `/followersList.php?user_id=${user_id}&me=${this.userService.user?.user_id}`)
  }

  public getTimeline(): void {
    this.LOADING_TWEETS = true
    this.client.get<Tweet[]>(this.bURL + '/tweets.php?timeline=' + this.userService.user?.user_id)
    .subscribe(
      {
        next: (tweets) => {
          this.LOADING_TWEETS = false
          this.timeline = tweets
        },
        error: (e) => {
          this.LOADING_TWEETS = false
        }
    })

  }


  public unfollow(user_id: number, complete: CallableFunction | null = null): Observable<any> {
    var query = this.client.post(this.bURL + '/followers.php?',
                                {following: user_id,
                                user_id: this.userService.user?.user_id,
                                action: 'unfollow'})
    query.subscribe({
      next: (res) => {

        if(complete) {complete()}
      }
    })
    return query
  }


  public follow(user_id: number, complete: CallableFunction | null = null): Observable<any> {
    var query = this.client.post(this.bURL + '/followers.php?',
                                {following: user_id,
                                user_id: this.userService.user?.user_id,
                                action: 'follow'})
    query.subscribe({
      next: (res) => {

      if(complete) {complete()}
    }
          })
    return query
  }



  public getFollowersStats(user_id: number): Observable<FollowersStats[]>{
    var query = this.client.get<FollowersStats[]>(this.bURL + `/followers.php?user=${user_id}&user_id=${this.userService.user?.user_id}`)
    return query
  }


  public getTweetStats(tweet_id: number,): Observable<TweetStats[]> {
    return this.client.get<TweetStats[]>(this.bURL + `/tweets.php?tweet_stats=true&tweet_id=${tweet_id}&user_id=${this.userService.user?.user_id}`)
  }


  public parseTweetText(text: string): string{
    text = text.replace(/#\w*/g, "<a class='hashtag'>$&</a>")
    text = text.replace(/#\w*/, "<a class='hashtag'>$&</a>")
    text = text.replace(/@\w*/g, "<a class='user-link'>$&</a>")
    return text
  }


  public getTweets(): Observable<Tweet[]> {
    return this.client.get<Tweet[]>(this.bURL + '/tweets.php');
  }

  public newTweet(tweet: PostTweet): Observable<PostTweet> {
   return this.client.post<PostTweet>(this.bURL + '/tweets.php', tweet)
  }

  public getTweet(tweet_id: number): Observable<Tweet[]> {
    return this.client.get<Tweet[]>(this.bURL + '/tweets.php?tweet_id=' + tweet_id)
  }

  public updateLike(tweet_id: number,  action: string, tweet: Tweet | null = null): Observable<any> {
    var query = this.client.post(this.bURL + '/like.php?',{tweet_id: tweet_id, user_id: this.userService.user?.user_id, action: action})
    query.subscribe()
    if(tweet && action == "like"){
      tweet.liked = 1
      tweet.likes += 1
    }
    if(tweet && action == "unlike"){
      tweet.liked = 0
      tweet.likes -= 1
    }
    return query
  }

  public getRecommended(callback: CallableFunction | null = null): void {
    this.client.get<User[]>(this.bURL + '/recommendedUsers.php?recommended=' + this.userService.user?.user_id)
    .subscribe(
      {
        next: (users) => {
        this.recommended = users
        },
        error: (e) => {
          if(callback) {callback()}
        }
      }
    )
  }


  public getHashtags(): void{
    this.client.get<Hashtag[]>(this.bURL + '/hashtags.php').subscribe(res => {this.trending = res}, error => {console.log(error)})
  }


  public updateTimeline(): void{
    this.getTweets().subscribe(res => {this.timeline = res}, error => {console.log(error)})
    this.getHashtags()
  }


  public checkUser(username: string): Observable<User[]>{
    return this.client.get<User[]>(this.bURL + '/checkUsername.php?username=' + username)
  }


  public searchTweets(query: string): void {
    this.LOADING_TWEETS = true
    this.timeline = []
    this.client.get<Tweet[]>(this.bURL + '/tweets.php?search=' + query)
    .subscribe(
      {
        next: (tweets) => {
          this.timeline = tweets
          this.LOADING_TWEETS = false
        }
      ,
        error: (e) => {
        console.log(e)
        }
    })
  }

  public searchUserTweets(user: string, mode: string = "normal"): void {
    this.client.get<Tweet[]>(this.bURL + `/tweets.php?username=${user}&mode=${mode}`).subscribe(
      {
        next: (tweets) => {
          this.timeline = tweets
          this.LOADING_TWEETS = false
        }

      }
    )
  }

  public getUser(username: string): Observable<User[]>{
    return this.client.get<User[]>(this.bURL + '/users.php?username=' + username)
  }
}


export class TimeLineMode{

  constructor(mode: string ){}

}


export class FollowersStats{

constructor(public followed: number, public followers: number, public following: number){}

}

export class PostTweet{

  constructor(public text: string | null,
              public user_id: number,
              public timestamp: number,
              public type: string = "normal",
              public original_tweet: number | null = null,
              public photo_1: string | null = null,
              public photo_2: string | null = null,
              public photo_3: string | null = null,
              public photo_4: string | null = null){}
}


export class TweetStats{

  constructor(public likes: number,
              public retweets: number,
              public response: number,
              public liked: number,
              public retweeted: number){}

}


export class Tweet{

  constructor(public tweet_id: number,
              public user_name: string,
              public user_nickname: string,
              public timestamp: number,
              public verified: number,
              public text: string,
              public avatar: string,
              public type: string,
              public original_tweet: number,
              public likes: number,
              public retweets: number,
              public response: number,
              public liked: number,
              public retweeted: number,
              public photo_1: string,
              public photo_2: string,
              public photo_3: string,
              public photo_4: string){}

}


export class Followers{

  constructor(following: number,
              followers: number,){}

}


export class Hashtag{

  constructor(public NAME: string, public count: number){}

}

