import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { LockComponent } from './component/lock/lock.component';
import { HomeComponent } from './component/home/home.component';
import { TimelineComponent } from './component/timeline/timeline.component';
import { TweetComponent } from './component/tweet/tweet.component';
import { SearchBarComponent } from './component/search-bar/search-bar.component';
import { MakeTweetComponent } from './component/make-tweet/make-tweet.component';
import { SideMenuComponent } from './component/side-menu/side-menu.component';
import { ProfileComponent } from './component/profile/profile.component';
import { SearchComponent } from './component/search/search.component';
import { TrendingComponent } from './component/trending/trending.component';
import { SideRecommendedComponent } from './component/side-recommended/side-recommended.component';
import { RegisterComponent } from './component/register/register.component';
import { MainComponent } from './component/main/main.component';
import { MakeResponseComponent } from './component/make-response/make-response.component';
import { TweetImageContainerComponent } from './component/tweet-view/tweet-image-container/tweet-image-container.component';
import { TweetDecoratorComponent } from './component/tweet-view/tweet-decorator/tweet-decorator.component';
import { TweetActionsComponent } from './component/tweet-view/tweet-actions/tweet-actions.component';
import { TweetHeaderComponent } from './component/tweet-view/tweet-header/tweet-header.component';
import { TweetUsernameComponent } from './component/tweet-view/tweet-username/tweet-username.component';
import { TweetTextComponent } from './component/tweet-view/tweet-text/tweet-text.component';
import { RetweetMenuComponent } from './component/retweet-menu/retweet-menu.component';
import { FollowListsComponent } from './component/follow-lists/follow-lists.component';
import { ExploreComponent } from './component/explore/explore.component';
import { EditProfileComponent } from './component/edit-profile/edit-profile.component';
import { StatusComponent } from './component/status/status.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LockComponent,
    HomeComponent,
    TimelineComponent,
    TweetComponent,
    SearchBarComponent,
    MakeTweetComponent,
    SideMenuComponent,
    ProfileComponent,
    SearchComponent,
    TrendingComponent,
    SideRecommendedComponent,
    RegisterComponent,
    MainComponent,
    MakeResponseComponent,
    TweetImageContainerComponent,
    TweetDecoratorComponent,
    TweetActionsComponent,
    TweetHeaderComponent,
    TweetUsernameComponent,
    TweetTextComponent,
    RetweetMenuComponent,
    FollowListsComponent,
    ExploreComponent,
    EditProfileComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
