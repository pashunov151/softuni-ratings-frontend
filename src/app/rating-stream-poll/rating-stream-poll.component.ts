import {Component, OnInit} from '@angular/core';
import {startWith, switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {interval} from 'rxjs';
import {Rating} from '../model/rating';
import {RatingService} from '../service/rating.service';

@Component({
  selector: 'app-rating-stream-poll',
  templateUrl: './rating-stream-poll.component.html',
  styleUrls: ['./rating-stream-poll.component.scss']
})
export class RatingStreamPollComponent implements OnInit {

  private lastRatingId = -1;
  ratings: Array<Rating> = [];

  qrCodeUrlImage: string;
  qrData: string = null;

  constructor(
    private http: HttpClient,
    private ratingService: RatingService
  ) {
    this.qrData = window.location.origin;
  }

  ngOnInit() {
    interval(3000)
    .pipe(
      startWith(0),
      switchMap(() => this.ratingService.getRatings(this.lastRatingId))
    )
    .subscribe(
      newRatings => this.renderNewestRatings(newRatings),
      error => console.error(error)
    );
    if (window.location.href.includes('localhost:4200')) {
      this.qrCodeUrlImage = '../../assets/local-url.png';
    } else {
      this.qrCodeUrlImage = '../../assets/prod-url.png';
    }
  }

  private renderNewestRatings(newRatings: Rating[]) {
    console.log('Add the new ratings to be rendered.');
    if (newRatings.length > 0) {
      newRatings.forEach(receivedRating => this.ratings.unshift(receivedRating));
      this.lastRatingId = newRatings[newRatings.length - 1].id;
    }
  }
}
