import {Component, Input, OnInit} from '@angular/core';
import {Rating} from '../model/rating';

@Component({
  selector: 'app-rating-view',
  templateUrl: './rating-view.component.html',
  styleUrls: ['./rating-view.component.scss']
})
export class RatingViewComponent implements OnInit {

  @Input()
  rating: Rating;

  constructor() { }

  ngOnInit() {
  }

}
