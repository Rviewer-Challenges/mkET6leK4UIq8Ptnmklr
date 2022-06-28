import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-retweet-menu',
  templateUrl: './retweet-menu.component.html',
  styleUrls: ['./retweet-menu.component.scss']
})
export class RetweetMenuComponent implements OnInit {


  @Output() close = new EventEmitter<any>();
  @Output() simple = new EventEmitter<any>();
  @Output() cite = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }


  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if(event.target.classList.contains("retweet-svg") || event.target.classList.contains("retweet")){

    }
    else{
      this.close.emit()
    }
  }

}
