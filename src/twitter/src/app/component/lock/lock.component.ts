import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-lock',
  templateUrl: './lock.component.html',
  styleUrls: ['./lock.component.scss']
})
export class LockComponent implements OnInit {

  form: FormGroup
  public register: boolean = false


  constructor( builder: FormBuilder, private user: UserService, private router: Router) {
    this.form = builder.group({"username": "", password: ""})
   }

  ngOnInit(): void {
    if(this.user){
      this.router.navigate(['/home'])
    }
  }


  public login(){

    this.user.postUser(this.form.controls['username'].value, this.form.controls["password"].value).subscribe(
      res => {
        console.log(res);
        this.user.setUser(res[0])
        this.router.navigate(['/home'])
      },
      error => {
        console.log(error)
      }
    )
  }



}
