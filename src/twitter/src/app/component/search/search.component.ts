import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/tweets.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  form: FormGroup
  private query: string = ""

  constructor(
    private route: ActivatedRoute,
    private tweets: ApiService,
    builder: FormBuilder,
    private router: Router
    ) {
      this.form = builder.group({query: ""})
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params : any) => {
      this.query = params.params['query']
      this.tweets.searchTweets(this.query)
      this.form.patchValue({query: this.query})
    });
  }

  public search(): void {
    this.router.navigate(['/search', this.form.controls['query'].value])
  }

}
