import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/service/tweets.service';
import { User } from 'src/app/service/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  @Input("user") user!: User
  form: FormGroup

  @Output( "close") close = new EventEmitter<void>()

  constructor(private formbuilder: FormBuilder, private api: ApiService) {
    this.form = formbuilder.group({
      username: "",
      avatar: "",
      background: "",
      bio: "",
    })
  }

  ngOnInit(): void {
    this.form.patchValue({
      username: this.user.user_nickname,
      avatar: this.user.avatar,
      bio: this.user.description,
      background: this.user.background
    })
  }


  public submit(): void{
    this.api.editProfile(this.form.controls["username"].value, this.form.controls["avatar"].value, this.form.controls["background"].value,  this.form.controls["bio"].value)
    this.close.emit()
  }

  public click(event: any): void{
    if(event.target.classList.contains("edit-profile") || event.target.classList.contains("close-btn")){
      document.body.style.overflow = "auto";
      this.close.emit()
    }
  }

}
