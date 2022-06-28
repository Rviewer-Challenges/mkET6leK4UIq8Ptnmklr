import { Component, HostListener, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {


  public closeEvent = false

  constructor(
    private router: Router,
    public userService: UserService
  ) { }


  public scroll: number = 20;
  public tweeting: boolean = false

  ngOnInit(): void {
  }


  public myProfile(): void{
    this.router.navigate([this.userService.user?.user_name]);
  }


  public hey(): void{
    this.closeEvent = true
  }

  public close(): void{
    this.userService.close()
    this.router.navigate(['/'])
  }


  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if(event.target.classList.contains("username")
      || event.target.classList.contains("profile")
      ||  event.target.classList.contains("nickname")
      ){

    }
    else{
      this.closeEvent = false
    }
  }


}
