import { Component, OnInit } from '@angular/core';
import {Rating} from '../model/rating';
import {RatingService} from '../service/rating.service';

@Component({
  selector: 'app-rating-submit',
  templateUrl: './rating-submit.component.html',
  styleUrls: ['./rating-submit.component.scss']
})
export class RatingSubmitComponent implements OnInit {

  model = new Rating(0, '');

  submitted = false;
  submitFailed = false;

  constructor(private ratingService: RatingService) {
    //
  }

  ngOnInit() {
  }

  onRate($event: {newValue: number}) {
    this.model.rating = $event.newValue;
  }

  onSubmit() {
    this.submitted = true;
    this.ratingService.saveRating(this.model).subscribe(
      (rating) => { console.log('yeah, saved!'); },
      () => { this.submitFailed = true; }
    );
  }
}
