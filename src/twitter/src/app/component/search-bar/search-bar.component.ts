import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  form: FormGroup

  constructor(builder: FormBuilder, private user: UserService, private router: Router) {
    this.form = builder.group({query: ""})
   }

  ngOnInit(): void {
  }

  public search(): void {
    this.router.navigate(['/search', this.form.controls['query'].value])
  }

}
