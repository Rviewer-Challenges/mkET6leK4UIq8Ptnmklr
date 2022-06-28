import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, MinValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { ApiService } from 'src/app/service/tweets.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public nameTaken: boolean = false
  @Output() closeEvent = new EventEmitter();
  form: FormGroup

  constructor(builder: FormBuilder, private user: UserService, private router: Router, private api : ApiService) {
    this.form = builder.group({username: ["", [Validators.minLength(1)]], password: ["", [Validators.minLength(4)]]})
    this.form.valueChanges.pipe(debounceTime(100)).subscribe(
      res =>{
        this.api.checkUser(this.form.controls['username'].value).subscribe(
          result =>{
            if(result[0]){
             this.nameTaken = true
            }
            else{
              this.nameTaken = false
            }
          }
        )
      }
    )
   }

  ngOnInit(): void {
  }




  public register(): void {
    this.user.postUser(this.form.controls['username'].value, this.form.controls["password"].value, true).subscribe(
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

  public close(): void {
    this.closeEvent.emit()
  }
}
