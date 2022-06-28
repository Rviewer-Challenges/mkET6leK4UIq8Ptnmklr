import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreComponent } from './component/explore/explore.component';
import { FollowListsComponent } from './component/follow-lists/follow-lists.component';
import { HomeComponent } from './component/home/home.component';
import { LockComponent } from './component/lock/lock.component';
import { LoginComponent } from './component/login/login.component';
import { ProfileComponent } from './component/profile/profile.component';
import { SearchComponent } from './component/search/search.component';
import { StatusComponent } from './component/status/status.component';
import { FollowersStats } from './service/tweets.service';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path:'', component: LockComponent},
  {path:'login', component: LockComponent},
  {path:'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'explore', component: ExploreComponent, canActivate: [AuthGuard]},
  {path: 'status/:tweetId', component: StatusComponent, canActivate: [AuthGuard]},
  {path: 'search/:query', component: SearchComponent, canActivate: [AuthGuard]},
  {path: ':username', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: ':username/:followMode', component: FollowListsComponent, canActivate: [AuthGuard]},
  {path:'login', component: LoginComponent},];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
